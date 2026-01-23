export interface ConsultationRequest {
  name: string;
  phoneNumber: string;
  email: string;
  content: string;
}

export interface ConsultationResponse {
  [key: string]: unknown;
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  content: string;
  createdAt: string;
}