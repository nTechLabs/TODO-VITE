// React 및 필요한 라이브러리 임포트
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Alert, Space, Card, message, Spin } from "antd";
import { useUserQuery, useAddUserMutation, useUpdateUserMutation } from "../../hooks/useUserQueries";
import "./user-list.css";

const { TextArea } = Input;

/**
 * 사용자 상세 정보를 표시하고 편집할 수 있는 컴포넌트
 * - React Query를 사용한 사용자 정보 조회 및 수정
 * - 기존 사용자 정보 수정 (id가 숫자인 경우)
 * - 새 사용자 추가 (id가 'new'인 경우)
 * - 폼 입력값 실시간 유효성 검사
 * - 변경사항 추적 및 취소 기능
 */
const UserDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 사용자 ID 추출
  const navigate = useNavigate(); // 라우터 네비게이션 훅
  const isNew = id === "new"; // 새 사용자 추가 모드인지 확인
  
  // React Query hooks 사용
  const { data: user, isLoading: userLoading } = useUserQuery(isNew ? null : id);
  const addUserMutation = useAddUserMutation();
  const updateUserMutation = useUpdateUserMutation();


  // 폼 초기값 설정 (새 사용자 vs 기존 사용자)
  const initialForm = isNew
    ? {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        company: "",
        companyCatchPhrase: "",
        companyBs: "",
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        lat: "",
        lng: "",
      }
    : {
        name: user?.name || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        website: user?.website || "",
        company: user?.company?.name || "",
        companyCatchPhrase: user?.company?.catchPhrase || "",
        companyBs: user?.company?.bs || "",
        street: user?.address?.street || "",
        suite: user?.address?.suite || "",
        city: user?.address?.city || "",
        zipcode: user?.address?.zipcode || "",
        lat: user?.address?.geo?.lat || "",
        lng: user?.address?.geo?.lng || "",
      };

  // 컴포넌트 상태 관리
  const [form, setForm] = useState(initialForm); // 폼 데이터
  const [emailError, setEmailError] = useState(""); // 이메일 유효성 검사 에러 메시지
  const [phoneError, setPhoneError] = useState(""); // 전화번호 유효성 검사 에러 메시지
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design 메시지 API

  // URL 파라미터 ID가 변경될 때마다 폼 초기화
  useEffect(() => {
    const newInitialForm = isNew
      ? {
          name: "",
          username: "",
          email: "",
          phone: "",
          website: "",
          company: "",
          companyCatchPhrase: "",
          companyBs: "",
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          lat: "",
          lng: "",
        }
      : {
          name: user?.name || "",
          username: user?.username || "",
          email: user?.email || "",
          phone: user?.phone || "",
          website: user?.website || "",
          company: user?.company?.name || "",
          companyCatchPhrase: user?.company?.catchPhrase || "",
          companyBs: user?.company?.bs || "",
          street: user?.address?.street || "",
          suite: user?.address?.suite || "",
          city: user?.address?.city || "",
          zipcode: user?.address?.zipcode || "",
          lat: user?.address?.geo?.lat || "",
          lng: user?.address?.geo?.lng || "",
        };
    setForm(newInitialForm);
  }, [id, user, isNew]);

  // 사용자 정보 로딩 중에는 아무것도 렌더링하지 않음 (또는 스피너)
  if (!isNew && userLoading) {
    return <Spin style={{ display: "block", margin: "40px auto" }} size="large" />;
  }
  // 사용자 정보가 없으면 에러 메시지 표시
  if (!user && !isNew && !userLoading) {
    return <Typography.Title level={5}>User not found</Typography.Title>;
  }

  /**
   * 입력 필드 변경 핸들러
   * 실시간으로 이메일과 전화번호 유효성 검사 수행
   * @param {Event} e - 입력 이벤트
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // 이메일 유효성 검사
    if (name === "email") {
      if (!value) {
        setEmailError("Email은 필수입니다.");
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        setEmailError("유효한 이메일 주소를 입력하세요.");
      } else {
        setEmailError("");
      }
    }
    
    // 전화번호 유효성 검사
    if (name === "phone") {
      if (!value) {
        setPhoneError("Phone은 필수입니다.");
      } else if (
        !/^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(value)
      ) {
        setPhoneError("유효한 전화번호를 입력하세요.");
      } else {
        setPhoneError("");
      }
    }
  };

  // 폼 데이터가 초기값에서 변경되었는지 확인
  const isChanged = Object.keys(form).some(
    (key) => form[key] !== initialForm[key]
  );

  /**
   * 취소 버튼 클릭 핸들러
   * 변경사항이 있으면 폼을 초기값으로 리셋하고,
   * 변경사항이 없으면 목록 페이지로 이동
   */
  const handleCancel = () => {
    if (!isChanged) {
      navigate("/zustandApi");
      return;
    }
    setForm(initialForm);
  };

  /**
   * 저장 버튼 클릭 핸들러
   * 유효성 검사를 통과한 경우에만 저장 수행
   * 새 사용자 추가 또는 기존 사용자 수정
   */
  const handleSave = async () => {
    // 유효성 검사 에러가 있으면 저장하지 않음
    if (emailError || phoneError) return;
    
    try {
      // 주소 정보를 객체로 구성
      const userData = {
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        website: form.website,
        company: {
          name: form.company,
          catchPhrase: form.companyCatchPhrase,
          bs: form.companyBs,
        },
        address: {
          street: form.street,
          suite: form.suite,
          city: form.city,
          zipcode: form.zipcode,
          geo: {
            lat: form.lat,
            lng: form.lng,
          },
        },
      };

      if (isNew) {
        await addUserMutation.mutateAsync(userData); // 새 사용자 추가
      } else {
        await updateUserMutation.mutateAsync({ ...userData, id }); // 기존 사용자 수정
      }
      messageApi.success("저장되었습니다.");
      navigate("/zustandApi");
    } catch (error) {
      messageApi.error("저장에 실패했습니다.");
    }
  };

  return (
    <div className="userDetailContainer">
      <Card className="userDetailPaper">
        {contextHolder} {/* 메시지 컨텍스트 홀더 */}
        
        {/* 페이지 제목 */}
        <Typography.Title level={4} className="userDetailTitle">
          {isNew ? "Add User" : "Edit User"}
        </Typography.Title>
      
      {/* 사용자 정보 입력 폼 */}
      <Form layout="vertical">
        {/* ID 표시 필드 (수정 모드일 때만) */}
        {!isNew && (
          <Form.Item label="ID">
            <Input value={user?.id || id} disabled style={{ backgroundColor: '#f5f5f5' }} />
          </Form.Item>
        )}
        
        {/* 이름 입력 필드 */}
        <Form.Item label="Name">
          <Input name="name" value={form.name} onChange={handleChange} />
        </Form.Item>
        
        {/* 사용자명 입력 필드 */}
        <Form.Item label="Username">
          <Input name="username" value={form.username} onChange={handleChange} />
        </Form.Item>
        
        {/* 이메일 입력 필드 (유효성 검사 포함) */}
        <Form.Item label="Email" validateStatus={emailError ? "error" : ""} help={emailError}>
          <Input name="email" value={form.email} onChange={handleChange} />
        </Form.Item>
        
        {/* 전화번호 입력 필드 (유효성 검사 포함) */}
        <Form.Item label="Phone" validateStatus={phoneError ? "error" : ""} help={phoneError}>
          <Input name="phone" value={form.phone} onChange={handleChange} />
        </Form.Item>
        
        {/* 웹사이트 입력 필드 */}
        <Form.Item label="Website">
          <Input name="website" value={form.website} onChange={handleChange} />
        </Form.Item>
        
        {/* 회사 정보 섹션 */}
        <Typography.Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
          Company Information
        </Typography.Title>
        
        <Form.Item label="Company Name">
          <Input name="company" value={form.company} onChange={handleChange} placeholder="Enter company name" />
        </Form.Item>
        
        <Form.Item label="Company Catch Phrase">
          <TextArea 
            name="companyCatchPhrase" 
            value={form.companyCatchPhrase} 
            onChange={handleChange} 
            placeholder="Enter company catch phrase"
            rows={2}
          />
        </Form.Item>
        
        <Form.Item label="Company BS">
          <TextArea 
            name="companyBs" 
            value={form.companyBs} 
            onChange={handleChange} 
            placeholder="Enter company business strategy"
            rows={2}
          />
        </Form.Item>
        
        {/* 주소 입력 필드들 */}
        <Typography.Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
          Address Information
        </Typography.Title>
        
        <Form.Item label="Street">
          <Input name="street" value={form.street} onChange={handleChange} placeholder="Enter street address" />
        </Form.Item>
        
        <Form.Item label="Suite">
          <Input name="suite" value={form.suite} onChange={handleChange} placeholder="Enter suite/apartment number" />
        </Form.Item>
        
        <Form.Item label="City">
          <Input name="city" value={form.city} onChange={handleChange} placeholder="Enter city" />
        </Form.Item>
        
        <Form.Item label="Zipcode">
          <Input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Enter zipcode" />
        </Form.Item>
        
        <Typography.Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
          Geographic Coordinates
        </Typography.Title>
        
        <Form.Item label="Latitude">
          <Input name="lat" value={form.lat} onChange={handleChange} placeholder="Enter latitude" />
        </Form.Item>
        
        <Form.Item label="Longitude">
          <Input name="lng" value={form.lng} onChange={handleChange} placeholder="Enter longitude" />
        </Form.Item>
        
        {/* 버튼 그룹 */}
        <Space style={{ marginTop: 24 }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button 
            type="primary" 
            onClick={handleSave} 
            loading={addUserMutation.isPending || updateUserMutation.isPending}
            disabled={!!emailError || !!phoneError} // 유효성 검사 에러가 있으면 비활성화
          >
            Save
          </Button>
        </Space>
        
        {/* 저장 에러 메시지 표시 */}
        {(addUserMutation.error || updateUserMutation.error) && (
          <Alert 
            type="error" 
            message={addUserMutation.error?.message || updateUserMutation.error?.message} 
            showIcon 
            style={{ marginTop: 16 }} 
          />
        )}
      </Form>
    </Card>
    </div>
  );
};

export default UserDetail;
