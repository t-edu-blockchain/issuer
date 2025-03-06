'use client';
import React, { useState } from 'react';
import { Button, Modal, Input, Card, Typography, Row, Col, Form, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';  // To generate unique certificate IDs

const { Title } = Typography;

// Define types for certificate data
interface Certificate {
  certificateId: string;
  recipientName: string;
  issueDate: string;
  validity: string;
}

const IssueCertificate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newCertificate, setNewCertificate] = useState<Certificate>({
    certificateId: '',
    recipientName: '',
    issueDate: '',
    validity: '',
  });
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewCertificate({ ...newCertificate, [field]: e.target.value });
  };

  // Generate a new certificate and add it to the list
  const handleIssueCertificate = () => {
    if (!newCertificate.recipientName || !newCertificate.issueDate || !newCertificate.validity) {
      message.error('Please fill out all the fields.');
      return;
    }

    const newCert: Certificate = {
      ...newCertificate,
      certificateId: uuidv4(),  // Generate a unique certificate ID
    };

    setCertificates([...certificates, newCert]);
    setIsModalOpen(false);
    setNewCertificate({
      certificateId: '',
      recipientName: '',
      issueDate: '',
      validity: '',
    });
    message.success('Certificate issued successfully!');
  };

  // Modal for creating a new certificate
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Issue a New Certificate</Title>
      
      {/* Button to open modal */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Issue New Certificate
      </Button>

      {/* Modal for issuing new certificate */}
      <Modal
        title="Issue New Certificate"
        open={isModalOpen}
        onOk={handleIssueCertificate}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleIssueCertificate}>
            Issue Certificate
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Recipient Name">
            <Input
              value={newCertificate.recipientName}
              onChange={(e) => handleInputChange(e, 'recipientName')}
              placeholder="Enter the recipient's name"
            />
          </Form.Item>
          <Form.Item label="Issue Date">
            <Input
              value={newCertificate.issueDate}
              onChange={(e) => handleInputChange(e, 'issueDate')}
              placeholder="Enter the issue date"
            />
          </Form.Item>
          <Form.Item label="Validity">
            <Input
              value={newCertificate.validity}
              onChange={(e) => handleInputChange(e, 'validity')}
              placeholder="Enter validity period (e.g., Lifetime, 1 Year)"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* List of issued certificates */}
      <Title level={3}>Issued Certificates</Title>
      <Row gutter={[16, 16]}>
        {certificates.map((certificate) => (
          <Col key={certificate.certificateId} span={8}>
            <Card>
              <Title level={4}>Certificate Information</Title>
              <p><strong>Certificate ID:</strong> {certificate.certificateId}</p>
              <p><strong>Recipient Name:</strong> {certificate.recipientName}</p>
              <p><strong>Issue Date:</strong> {certificate.issueDate}</p>
              <p><strong>Validity:</strong> {certificate.validity}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default IssueCertificate;

