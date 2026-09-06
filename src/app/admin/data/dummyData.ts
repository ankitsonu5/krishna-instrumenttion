export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  industry: string;
  status: "Active" | "Draft" | "Archived";
  range: string;
  accuracy: string;
  output: string;
  datasheet: string;
  updatedAt: string;
  stockStatus: "In Stock" | "Made to Order" | "Low Stock";
  inquiriesCount: number;
}

export interface Inquiry {
  id: string;
  clientName: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  quantity: string;
  application: string;
  status: "New" | "In Review" | "Quoted" | "Closed";
  priority: "High" | "Medium" | "Low";
  date: string;
  message: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  description: string;
  status: "Active" | "Inactive";
  iconName: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: "PDF" | "Image" | "CAD / Drawing";
  size: string;
  relatedProduct: string;
  uploadDate: string;
  url: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: "product" | "inquiry" | "media" | "system";
}

export const INITIAL_PRODUCTS: Product[] = [];
export const INITIAL_INQUIRIES: Inquiry[] = [];
export const INITIAL_CATEGORIES: Category[] = [];
export const INITIAL_MEDIA: MediaItem[] = [];
export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: "act-1",
    user: "System",
    action: "Clean SQLite database initialized",
    target: "cms.db",
    time: "Just now",
    type: "system",
  },
];
