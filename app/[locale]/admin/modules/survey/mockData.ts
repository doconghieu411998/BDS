import { Survey } from '@/types/common';

// Mock data for surveys
const mockSurveys: Survey[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    content: 'Tôi muốn tìm hiểu về dự án căn hộ tại Quận 2, diện tích khoảng 80m2, giá tầm 3-4 tỷ.',
    createdAt: '2024-01-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    phone: '0912345678',
    content: 'Xin tư vấn về các dự án nhà phố liền kề khu vực Thủ Đức, diện tích trên 100m2.',
    createdAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    phone: '0923456789',
    content: 'Quan tâm đến biệt thự vườn khu Nam Sài Gòn, có sân vườn rộng, phù hợp nuôi thú cưng.',
    createdAt: '2024-01-13T10:15:00Z',
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    phone: '0934567890',
    content: 'Cần mua đất nền để xây nhà, khu vực gần trường học, bệnh viện. Giá dưới 2 tỷ.',
    createdAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    phone: '0945678901',
    content:
      'Muốn thuê căn hộ dịch vụ ngắn hạn gần công ty, có đầy đủ nội thất, giá khoảng 10-15 triệu/tháng.',
    createdAt: '2024-01-11T09:30:00Z',
  },
  {
    id: '6',
    name: 'Đỗ Thị F',
    phone: '0956789012',
    content: 'Tư vấn về thủ tục mua bán nhà đất, chuyển nhượng và các chi phí liên quan.',
    createdAt: '2024-01-10T11:00:00Z',
  },
  {
    id: '7',
    name: 'Vũ Văn G',
    phone: '0967890123',
    content: 'Quan tâm đến shophouse mặt tiền đường lớn khu vực Bình Thạnh để kinh doanh.',
    createdAt: '2024-01-09T15:30:00Z',
  },
  {
    id: '8',
    name: 'Bùi Thị H',
    phone: '0978901234',
    content: 'Tìm căn hộ 2-3 phòng ngủ khu vực Quận 7, có view sông, có chỗ đậu xe.',
    createdAt: '2024-01-08T13:20:00Z',
  },
];

interface GetListParams {
  page: number;
  limit: number;
  search?: string;
}

interface GetListResponse {
  data: Survey[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Mock service for surveys
export const surveyService = {
  getList: async ({ page, limit, search }: GetListParams): Promise<GetListResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredSurveys = [...mockSurveys];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredSurveys = filteredSurveys.filter(
        (survey) =>
          survey.name.toLowerCase().includes(searchLower) ||
          survey.phone.includes(searchLower) ||
          survey.content.toLowerCase().includes(searchLower),
      );
    }

    // Sort by createdAt descending
    filteredSurveys.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const total = filteredSurveys.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filteredSurveys.slice(start, end);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  },

  getById: async (id: string): Promise<Survey | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const survey = mockSurveys.find((s) => s.id === id);
    return survey || null;
  },

  delete: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockSurveys.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockSurveys.splice(index, 1);
    }
  },
};
