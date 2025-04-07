import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

interface SnapshotData {
  breakdown: {
    Yearly: number;
    Monthly: number;
    BiWeekly: number;
    Weekly: number;
    Daily: number;
    Hourly: number;
  };
  projections: {
    FifteenYears: number;
    TenYears: number;
    FiveYears: number;
  };
  timeBank: {
    Dinner: number;
    MovieNight: number;
    NewHouse: number;
    NewCar: number;
  };
}

const SnapshotLive: React.FC = () => {
  const [method, setMethod] = useState<string>("Hourly");
  const [amount, setAmount] = useState<string>("");
  const [weeklyHours, setWeeklyHours] = useState<string>("");
  const [snapshotData, setSnapshotData] = useState<SnapshotData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
    setAmount("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleWeeklyHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeeklyHours(e.target.value);
  };

  const getPayload = () => {
    const wh = weeklyHours ? Number(weeklyHours) : undefined;
    const amt = Number(amount);
    let payload: any = {};
    switch (method) {
      case "Hourly":
        payload = { hourly_rate: amt, weekly_hours: wh };
        break;
      case "Daily": {
        const hours = wh || 37.5;
        const hourly_rate = amt / (hours / 5);
        payload = { hourly_rate, weekly_hours: hours };
        break;
      }
      case "Weekly":
        payload = { weekly_income: amt, weekly_hours: wh };
        break;
      case "Monthly":
        payload = { yearly_income: amt * 12, weekly_hours: wh };
        break;
      case "Yearly":
        payload = { yearly_income: amt, weekly_hours: wh };
        break;
      default:
        break;
    }
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = getPayload();
    try {
      const res = await fetch("http://localhost:8000/api/snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setSnapshotData(data);
    } catch (error) {
      console.error("Error fetching snapshot data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to generate time bank details.
  const generateTimeBankDetails = (hours: number) => {
    const workDays = hours / 8;
    const workWeeks = hours / 40;
    const workMonths = hours / 160;
    const workYears = hours / 2080;

    const details: string[] = [];
    if (workDays >= 1) details.push(`${workDays.toFixed(0)} work days`);
    if (workDays >= 1) details.push(`${workDays.toFixed(0)} eight-hour shifts`);
    if (workWeeks >= 1) details.push(`${workWeeks.toFixed(0)} work weeks`);
    if (workMonths >= 1) details.push(`${workMonths.toFixed(0)} work months`);
    if (workYears >= 1) details.push(`${workYears.toFixed(0)} work years`);

    return details.length > 0
      ? `That's ${details.join(", ")} of work needed.`
      : "";
  };

  // Render a modern, minimalist snapshot cell.
  const renderSnapshotCell = (title: string, content: React.ReactNode) => (
    <Card className="mb-3 border-1 shadow-sm" style={{ borderRadius: "8px" }}>
      <Card.Body className="p-3">
        <Card.Title className="fs-6 text-muted">{title}</Card.Title>
        <Card.Text className="fs-5">{content}</Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
      <h2
        className="text-center mb-4"
        style={{ fontWeight: 300, letterSpacing: "0.05em" }}
      >
        Financial Snapshot
      </h2>

      <Card
        className="p-4 mb-4 border-1 shadow-sm"
        style={{ borderRadius: "12px" }}
      >
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="inputMethod">
                <Form.Label className="text-muted">Method</Form.Label>
                <Form.Select value={method} onChange={handleMethodChange}>
                  <option value="Hourly">Hourly</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="amount">
                <Form.Label className="text-muted">
                  {method === "Hourly" ? "Hourly Rate" : "Amount"}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={method === "Hourly" ? "e.g. 25" : "e.g. 60000"}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="weeklyHours">
                <Form.Label className="text-muted">Weekly Hours</Form.Label>
                <Form.Control
                  type="text"
                  value={weeklyHours}
                  onChange={handleWeeklyHoursChange}
                  placeholder="e.g. 40"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" className="mt-3 w-100">
            {loading ? "Updating..." : "Update Snapshot"}
          </Button>
        </Form>
      </Card>

      {snapshotData ? (
        <>
          <h4
            className="text-center mt-4"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Salary Breakdown
          </h4>
          <Row className="mt-3">
            {Object.entries(snapshotData.breakdown)
              .filter(([_, value]) => value !== 0)
              .map(([key, value], index) => (
                <Col key={index} xs={12} md={4}>
                  {renderSnapshotCell(
                    key,
                    `$${Number(value).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  )}
                </Col>
              ))}
          </Row>

          <h4
            className="text-center mt-4"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Projections
          </h4>
          <Row className="mt-3">
            {Object.entries(snapshotData.projections)
              .filter(([_, value]) => value !== 0)
              .map(([key, value], index) => (
                <Col key={index} xs={12} md={4}>
                  {renderSnapshotCell(
                    key,
                    `$${Number(value).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  )}
                </Col>
              ))}
          </Row>

          <h4
            className="text-center mt-4"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Time Bank
          </h4>
          <Row className="mt-3">
            {Object.entries(snapshotData.timeBank)
              .filter(([_, value]) => value !== 0)
              .map(([key, value], index) => {
                const details = generateTimeBankDetails(Number(value));
                return (
                  <Col key={index} xs={12} md={4}>
                    {renderSnapshotCell(
                      key,
                      <>
                        <div>
                          {`Will cost you $${Number(value).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )} hours of work.`}
                        </div>
                        {details && (
                          <div className="text-muted fs-7">{details}</div>
                        )}
                      </>
                    )}
                  </Col>
                );
              })}
          </Row>
        </>
      ) : (
        <p className="text-center mt-4 text-muted">
          {loading ? "Loading..." : "Enter data and click 'Update Snapshot'"}
        </p>
      )}
    </Container>
  );
};

export default SnapshotLive;
