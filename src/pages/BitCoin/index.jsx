import React, { useState, useEffect } from "react";
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Statistic, 
  Row, 
  Col, 
  Spin, 
  Alert,
  Select,
  Table,
  Tag
} from "antd";
import { 
  ReloadOutlined, 
  CaretUpOutlined, 
  CaretDownOutlined,
  DollarOutlined 
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./BitCoin.css";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;
const { Option } = Select;

function BitCoin() {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [priceHistory, setPriceHistory] = useState([]);
  const [ethereumHistory, setEthereumHistory] = useState([]);
  const [chartData24h, setChartData24h] = useState({ bitcoin: [], ethereum: [] });

  // 암호화폐 목록
  const cryptoList = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
  ];

  // 지원 통화
  const currencies = [
    { value: 'usd', label: 'USD ($)' },
    { value: 'eur', label: 'EUR (€)' },
    { value: 'krw', label: 'KRW (₩)' },
    { value: 'jpy', label: 'JPY (¥)' },
  ];

  // 3개월 가격 히스토리 데이터 생성 (Mock 데이터)
  const generate3MonthData = (currentBitcoinPrice, currentEthereumPrice) => {
    const data = { bitcoin: [], ethereum: [] };
    const now = new Date();
    const threemonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000)); // 3개월 전
    
    // 현재 실제 가격을 기준으로 설정
    const bitcoinBasePrice = currentBitcoinPrice || 45000;
    const ethereumBasePrice = currentEthereumPrice || 3200;
    
    // 3개월 동안의 일별 데이터 생성 (90일)
    for (let i = 0; i < 90; i++) {
      const currentDate = new Date(threemonthsAgo.getTime() + (i * 24 * 60 * 60 * 1000));
      
      // 진행률 (0부터 1까지)
      const progress = i / 89;
      
      // 비트코인 가격 시뮬레이션 (3개월 전부터 현재까지)
      const bitcoinVolatility = 0.03; // 3% 변동성
      const bitcoinTrend = Math.sin(i / 15) * 0.05; // 주기적 트렌드
      const bitcoinRandom = (Math.random() - 0.5) * bitcoinVolatility;
      
      // 마지막 날(오늘)에는 현재 가격으로 수렴
      let bitcoinPrice;
      if (i === 89) {
        bitcoinPrice = bitcoinBasePrice; // 마지막 날은 정확한 현재 가격
      } else {
        // 3개월 전 가격에서 현재 가격까지 점진적 변화
        const startPrice = bitcoinBasePrice * 0.85; // 3개월 전 가격 (현재의 85%)
        const priceProgression = startPrice + (bitcoinBasePrice - startPrice) * progress;
        bitcoinPrice = priceProgression * (1 + bitcoinTrend + bitcoinRandom);
      }
      
      // 이더리움 가격 시뮬레이션
      const ethereumVolatility = 0.04; // 4% 변동성
      const ethereumTrend = Math.sin(i / 12) * 0.06; // 주기적 트렌드
      const ethereumRandom = (Math.random() - 0.5) * ethereumVolatility;
      
      let ethereumPrice;
      if (i === 89) {
        ethereumPrice = ethereumBasePrice; // 마지막 날은 정확한 현재 가격
      } else {
        // 3개월 전 가격에서 현재 가격까지 점진적 변화
        const startPrice = ethereumBasePrice * 0.80; // 3개월 전 가격 (현재의 80%)
        const priceProgression = startPrice + (ethereumBasePrice - startPrice) * progress;
        ethereumPrice = priceProgression * (1 + ethereumTrend + ethereumRandom);
      }
      
      data.bitcoin.push({
        time: currentDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        price: bitcoinPrice,
        timestamp: currentDate.getTime()
      });
      
      data.ethereum.push({
        time: currentDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        price: ethereumPrice,
        timestamp: currentDate.getTime()
      });
    }
    
    setChartData24h(data);
  };

  // 암호화폐 가격 정보 가져오기
  const fetchCryptoData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const cryptoIds = cryptoList.map(crypto => crypto.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=${selectedCurrency}&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data = await response.json();
      
      // 데이터 구조 변환
      const formattedData = cryptoList.map(crypto => {
        const priceData = data[crypto.id];
        return {
          ...crypto,
          price: priceData?.[selectedCurrency] || 0,
          change24h: priceData?.[`${selectedCurrency}_24h_change`] || 0,
          marketCap: priceData?.[`${selectedCurrency}_market_cap`] || 0,
          volume24h: priceData?.[`${selectedCurrency}_24h_vol`] || 0,
        };
      });
      
      setBitcoinData(formattedData);
      
      // 실시간 가격 히스토리에 Bitcoin과 Ethereum 가격 추가 (실시간 차트용)
      const bitcoinPrice = formattedData.find(crypto => crypto.id === 'bitcoin')?.price;
      const ethereumPrice = formattedData.find(crypto => crypto.id === 'ethereum')?.price;
      
      if (bitcoinPrice) {
        setPriceHistory(prev => {
          const now = Date.now();
          const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000); // 24시간 전
          
          // 24시간 이내의 데이터만 유지
          const filteredHistory = prev.filter(entry => entry.timestamp > twentyFourHoursAgo);
          
          return [
            ...filteredHistory,
            {
              time: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              }),
              price: bitcoinPrice,
              timestamp: now
            }
          ];
        });
      }
      
      if (ethereumPrice) {
        setEthereumHistory(prev => {
          const now = Date.now();
          const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000); // 24시간 전
          
          // 24시간 이내의 데이터만 유지
          const filteredHistory = prev.filter(entry => entry.timestamp > twentyFourHoursAgo);
          
          return [
            ...filteredHistory,
            {
              time: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              }),
              price: ethereumPrice,
              timestamp: now
            }
          ];
        });
      }
      
      // 3개월 차트 데이터 생성 (현재 가격 기준)
      const currentBitcoinPrice = formattedData.find(crypto => crypto.id === 'bitcoin')?.price;
      const currentEthereumPrice = formattedData.find(crypto => crypto.id === 'ethereum')?.price;
      generate3MonthData(currentBitcoinPrice, currentEthereumPrice);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchCryptoData();
  }, [selectedCurrency]);

  // 자동 새로고침 (5분마다 - 24시간 데이터 포함)
  useEffect(() => {
    const interval = setInterval(fetchCryptoData, 300000); // 5분 = 300000ms
    return () => clearInterval(interval);
  }, [selectedCurrency]);

  // 가격 변동 색상 결정
  const getPriceChangeColor = (change) => {
    if (change > 0) return '#52c41a';
    if (change < 0) return '#ff4d4f';
    return '#8c8c8c';
  };

  // 숫자 포맷팅
  const formatPrice = (price, currency) => {
    const options = {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: currency === 'krw' ? 0 : 2,
      maximumFractionDigits: currency === 'krw' ? 0 : 8,
    };
    
    try {
      return new Intl.NumberFormat('en-US', options).format(price);
    } catch {
      return `${price.toFixed(2)} ${currency.toUpperCase()}`;
    }
  };

  // 3개월 차트 데이터 생성 (이중 Y축)
  const create3MonthChartData = () => {
    if (!chartData24h.bitcoin.length || !chartData24h.ethereum.length) {
      return null;
    }

    return {
      labels: chartData24h.bitcoin.map(entry => entry.time),
      datasets: [
        {
          label: 'Bitcoin (BTC)',
          data: chartData24h.bitcoin.map(entry => entry.price),
          borderColor: '#ff8c00',
          backgroundColor: 'rgba(255, 140, 0, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#ff8c00',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 1,
          pointHoverRadius: 4,
          yAxisID: 'y', // 왼쪽 Y축 사용
        },
        {
          label: 'Ethereum (ETH)',
          data: chartData24h.ethereum.map(entry => entry.price),
          borderColor: '#1890ff',
          backgroundColor: 'rgba(24, 144, 255, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#1890ff',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 1,
          pointHoverRadius: 4,
          yAxisID: 'y1', // 오른쪽 Y축 사용
        },
      ],
    };
  };

  // 실시간 차트 데이터 생성
  const createRealtimeChartData = () => {
    if (!priceHistory.length && !ethereumHistory.length) {
      return null;
    }

    // 두 데이터의 시간 축을 맞춤
    const maxLength = Math.max(priceHistory.length, ethereumHistory.length);
    const labels = [];
    const bitcoinData = [];
    const ethereumData = [];

    for (let i = 0; i < maxLength; i++) {
      const bitcoinEntry = priceHistory[i];
      const ethereumEntry = ethereumHistory[i];
      
      if (bitcoinEntry) {
        labels.push(bitcoinEntry.time);
        bitcoinData.push(bitcoinEntry.price);
      }
      if (ethereumEntry) {
        ethereumData.push(ethereumEntry.price);
      }
    }

    return {
      labels,
      datasets: [
        {
          label: 'Bitcoin (BTC)',
          data: bitcoinData,
          borderColor: '#ff8c00',
          backgroundColor: 'rgba(255, 140, 0, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#ff8c00',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 8,
          yAxisID: 'y', // 왼쪽 Y축 사용
        },
        {
          label: 'Ethereum (ETH)',
          data: ethereumData,
          borderColor: '#1890ff',
          backgroundColor: 'rgba(24, 144, 255, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#1890ff',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 8,
          yAxisID: 'y1', // 오른쪽 Y축 사용
        },
      ],
    };
  };

  // 차트 데이터 생성 (기존 실시간 데이터용)
  const chartData = {
    labels: priceHistory.map(entry => entry.time),
    datasets: [
      {
        label: 'Bitcoin Price',
        data: priceHistory.map(entry => entry.price),
        borderColor: '#ff8c00',
        backgroundColor: 'rgba(255, 140, 0, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ff8c00',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // 실시간 차트 옵션
  const realtimeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y;
            return `${datasetLabel}: ${formatPrice(value, selectedCurrency)}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#666',
          maxTicksLimit: 12,
          callback: function(value, index) {
            // 2시간마다 시간 표시
            if (index % 2 === 0) {
              return this.getLabelForValue(value);
            }
            return '';
          }
        },
        title: {
          display: true,
          text: '24시간 실시간 (5분 간격)',
          color: '#666',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 140, 0, 0.2)',
        },
        ticks: {
          color: '#ff8c00',
          callback: function(value) {
            return formatPrice(value, selectedCurrency);
          }
        },
        title: {
          display: true,
          text: 'Bitcoin Price ($)',
          color: '#ff8c00',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#1890ff',
          callback: function(value) {
            return formatPrice(value, selectedCurrency);
          }
        },
        title: {
          display: true,
          text: 'Ethereum Price ($)',
          color: '#1890ff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    }
  };

  // 3개월 차트 옵션
  const chart3MonthOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y;
            const formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(value);
            return `${datasetLabel}: ${formattedValue}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#666',
          maxTicksLimit: 12,
          callback: function(value, index) {
            // 1주일마다 날짜 표시 (7일마다)
            if (index % 7 === 0) {
              return this.getLabelForValue(value);
            }
            return '';
          }
        },
        title: {
          display: true,
          text: '3개월 기간 (90일)',
          color: '#666',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 140, 0, 0.2)',
        },
        ticks: {
          color: '#ff8c00',
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(value);
          }
        },
        title: {
          display: true,
          text: 'Bitcoin Price ($)',
          color: '#ff8c00',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#1890ff',
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(value);
          }
        },
        title: {
          display: true,
          text: 'Ethereum Price ($)',
          color: '#1890ff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    }
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      title: 'Cryptocurrency',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Text strong>{record.symbol}</Text>
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <Text strong style={{ fontSize: '16px' }}>
          {formatPrice(price, selectedCurrency)}
        </Text>
      ),
    },
    {
      title: '24h Change',
      dataIndex: 'change24h',
      key: 'change24h',
      render: (change) => (
        <Tag color={change >= 0 ? 'green' : 'red'}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </Tag>
      ),
    },
    {
      title: '24h Volume',
      dataIndex: 'volume24h',
      key: 'volume24h',
      render: (volume) => formatPrice(volume, selectedCurrency),
    },
  ];

  return (
    <div className="bitcoin-container" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="bitcoin-header">
        <Title level={2}>
          <DollarOutlined style={{ marginRight: '8px', color: '#ff8c00' }} />
          Bitcoin & Ethereum Dashboard by Lion
        </Title>
        <Space>
          <Select 
            value={selectedCurrency} 
            onChange={setSelectedCurrency}
            style={{ width: 120 }}
          >
            {currencies.map(currency => (
              <Option key={currency.value} value={currency.value}>
                {currency.label}
              </Option>
            ))}
          </Select>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />} 
            onClick={fetchCryptoData}
            loading={loading}
          >
            Refresh
          </Button>
        </Space>
      </div>

      {error && (
        <Alert 
          message="Error" 
          description={error} 
          type="error" 
          style={{ marginBottom: '16px' }}
        />
      )}

      {loading && !bitcoinData ? (
        <div className="loading-container">
          <Spin size="large" />
          <Text style={{ marginTop: '16px' }}>Loading cryptocurrency data...</Text>
        </div>
      ) : (
        <>
          {/* Bitcoin & Ethereum 메인 카드 */}
          {bitcoinData && (
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card className="bitcoin-main-card">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="Bitcoin (BTC)"
                        value={bitcoinData.find(crypto => crypto.id === 'bitcoin')?.price || 0}
                        prefix={selectedCurrency === 'krw' ? '₩' : '$'}
                        precision={selectedCurrency === 'krw' ? 0 : 2}
                        valueStyle={{ 
                          color: getPriceChangeColor(
                            bitcoinData.find(crypto => crypto.id === 'bitcoin')?.change24h || 0
                          ),
                          fontSize: '1.8rem'
                        }}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="24h Change"
                        value={bitcoinData.find(crypto => crypto.id === 'bitcoin')?.change24h || 0}
                        suffix="%"
                        precision={2}
                        valueStyle={{ 
                          color: getPriceChangeColor(
                            bitcoinData.find(crypto => crypto.id === 'bitcoin')?.change24h || 0
                          )
                        }}
                        prefix={
                          (bitcoinData.find(crypto => crypto.id === 'bitcoin')?.change24h || 0) >= 0 
                            ? <CaretUpOutlined /> 
                            : <CaretDownOutlined />
                        }
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card className="ethereum-main-card">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="Ethereum (ETH)"
                        value={bitcoinData.find(crypto => crypto.id === 'ethereum')?.price || 0}
                        prefix={selectedCurrency === 'krw' ? '₩' : '$'}
                        precision={selectedCurrency === 'krw' ? 0 : 2}
                        valueStyle={{ 
                          color: getPriceChangeColor(
                            bitcoinData.find(crypto => crypto.id === 'ethereum')?.change24h || 0
                          ),
                          fontSize: '1.8rem'
                        }}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="24h Change"
                        value={bitcoinData.find(crypto => crypto.id === 'ethereum')?.change24h || 0}
                        suffix="%"
                        precision={2}
                        valueStyle={{ 
                          color: getPriceChangeColor(
                            bitcoinData.find(crypto => crypto.id === 'ethereum')?.change24h || 0
                          )
                        }}
                        prefix={
                          (bitcoinData.find(crypto => crypto.id === 'ethereum')?.change24h || 0) >= 0 
                            ? <CaretUpOutlined /> 
                            : <CaretDownOutlined />
                        }
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )}

          {/* 실시간 가격 히스토리 차트 (Bitcoin + Ethereum) */}
          {(priceHistory.length > 0 || ethereumHistory.length > 0) && createRealtimeChartData() && (
            <Card 
              title="24시간 실시간 가격 차트 (Bitcoin & Ethereum)" 
              className="price-history-card"
              extra={
                <Space>
                  <Tag color="orange">Bitcoin</Tag>
                  <Tag color="blue">Ethereum</Tag>
                  <Tag color="green">
                    24시간 데이터 ({Math.max(priceHistory.length, ethereumHistory.length)} points)
                  </Tag>
                </Space>
              }
            >
              <div className="chart-container">
                <Line data={createRealtimeChartData()} options={realtimeChartOptions} />
              </div>
            </Card>
          )}

          {/* 3개월 가격 히스토리 차트 */}
          {create3MonthChartData() && (
            <Card 
              title="3개월 가격 차트 (Bitcoin vs Ethereum)" 
              className="price-history-card"
              extra={
                <Space>
                  <Tag color="orange">Bitcoin</Tag>
                  <Tag color="blue">Ethereum</Tag>
                  <Tag color="green">90일 데이터 (현재 가격 기준)</Tag>
                </Space>
              }
            >
              <div className="chart-container">
                <Line data={create3MonthChartData()} options={chart3MonthOptions} />
              </div>
            </Card>
          )}

          {/* 전체 암호화폐 테이블 */}
          <Card title="Top Cryptocurrencies">
            <Table
              dataSource={bitcoinData}
              columns={columns}
              rowKey="id"
              pagination={false}
              loading={loading}
            />
          </Card>
        </>
      )}
    </div>
  );
}

export default BitCoin;
