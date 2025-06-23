import React from "react";
import { Button, Input, Select, DatePicker, Progress } from "antd";
import "./TaskForm.css";

const { TextArea } = Input;

export default function TaskForm() {
  return (
    <div className="taskform-root">
      {/* Top Bar */}
      <div className="taskform-topbar">
        <Button type="link" className="taskform-close-btn">
          X
        </Button>
        <span className="taskform-title">Add New Task</span>
      </div>
      <div className="taskform-body">
        <Input className="taskform-input" placeholder="Space" />
        <Input className="taskform-input" placeholder="제목" />
        <Select
          className="taskform-select"
          placeholder="상태선택"
          options={[]}
        />
        <Select
          className="taskform-select"
          placeholder="실시자선택"
          mode="multiple"
          options={[]}
        />
        <Select
          className="taskform-select"
          placeholder="참조자선택"
          mode="multiple"
          options={[]}
        />
        <Select
          className="taskform-select"
          placeholder="요청자선택"
          options={[]}
        />
        <div className="taskform-date-row">
          <DatePicker className="taskform-date" placeholder="시작일" />
          <DatePicker className="taskform-date" placeholder="마감일" />
        </div>
        <Select
          className="taskform-select"
          placeholder="카테고리선택"
          options={[]}
        />
        <Select
          className="taskform-select"
          placeholder="라벨선택"
          options={[]}
        />
        <Input className="taskform-input" placeholder="진행율" />
        <div className="taskform-progress-row">
          <span>0%</span>
          <Progress
            percent={0}
            showInfo={false}
            style={{ flex: 1, margin: "0 8px" }}
          />
          <span>100%</span>
        </div>
        <TextArea className="taskform-desc" placeholder="설명" rows={5} />
      </div>
      <Button block className="taskform-submit-btn">
        작성완료버튼
      </Button>
    </div>
  );
}
