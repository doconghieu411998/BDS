export interface ConsultationRequest {
  name: string;
  phoneNumber: string;
  email: string;
  content: string;
}

export interface ConsultationResponse {
  id?: string | number;
  name: string;
  phoneNumber: string;
  email: string;
  content: string;
  createdAt: string;
}