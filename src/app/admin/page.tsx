"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  Settings,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle,
  Building2,
  Layers,
  ShieldCheck,
  Menu,
  X,
  RefreshCw,
  Gauge,
  Wrench,
  Factory,
  Briefcase,
  Users,
  HardHat,
  MapPin,
  FileText,
  Save,
  Check,
  Zap,
  Cpu,
  FileCheck,
  Activity,
  Calendar,
  Flame,
  Droplets,
  Waves,
  Compass,
  SlidersHorizontal,
  CheckCircle2,
  CircuitBoard,
  Radio,
  Cog,
  Server,
  Box,
  Download,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Building,
  User,
  Copy,
  Search,
  Filter,
  Lock,
  Unlock,
  LogOut,
  Key,
  KeyRound,
  Shield,
  Paperclip,
  UserCheck,
  GraduationCap,
  Clock,
} from "lucide-react";

import RichEditor from "./components/RichEditor";

export const AVAILABLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Zap,
  Settings,
  Layers,
  Cpu,
  FileCheck,
  Activity,
  ShieldCheck,
  Calendar,
  Gauge,
  Factory,
  Building2,
  HardHat,
  Flame,
  Droplets,
  Waves,
  Compass,
  Sliders: SlidersHorizontal,
  CheckCircle2,
  CircuitBoard,
  Radio,
  Cog,
  Server,
  Box,
  FileText,
  Briefcase,
  UserCheck,
  GraduationCap,
};

export function getDynamicIcon(
  iconName?: string,
  defaultIcon: React.ComponentType<{ className?: string }> = Wrench
): React.ComponentType<{ className?: string }> {
  if (!iconName) return defaultIcon;
  return AVAILABLE_ICONS[iconName] || defaultIcon;
}

type TabType =
  | "overview"
  | "services"
  | "industries"
  | "projects"
  | "clients"
  | "infrastructure"
  | "careers"
  | "banners"
  | "page_contents"
  | "inquiries"
  | "career_applications"
  | "settings";

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  icon_name: string;
  short_desc: string;
  bullets: string[];
}

interface IndustryItem {
  id: number;
  title: string;
  slug: string;
  icon_name: string;
  short_desc: string;
  challenge: string;
  image_url: string;
}

interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  client: string;
  location: string;
  industry: string;
  status: "Completed" | "Ongoing";
  service: string;
  period: string;
  scope: string;
  outcome: string;
}

interface ClientItem {
  id: number;
  name: string;
  role: string;
  description: string;
  status: string;
  logo_url: string;
}

interface EquipmentItem {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  model: string;
  qty: string;
  calibration_status: string;
  use_case: string;
  availability: string;
}

interface CareerItem {
  id: number;
  title: string;
  department: string;
  experience: string;
  location: string;
  job_type: string;
  description: string;
  requirements: string[];
  icon_name?: string;
  role_value?: string;
}

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  media_type: "video" | "image";
  media_url: string;
  cta_text: string;
  cta_link: string;
  is_active: number;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // States for collections fetched from SQLite DB
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Page Content Editor State (About Us / Contact / Policies)
  const [selectedPageKey, setSelectedPageKey] = useState<string>("about-us");
  const [pageSectionKey, setPageSectionKey] = useState<string>("company_profile");
  const [pageSectionTitle, setPageSectionTitle] = useState<string>("About Krishna Instrumentation Works");
  const [pageSectionSubtitle, setPageSectionSubtitle] = useState<string>("Engineering Precision & Execution Reliability Across India");
  const [pageRichContent, setPageRichContent] = useState<string>(
    `<p><strong>Krishna Instrumentation Works (KIW)</strong> is an industrial service organization providing field instrumentation, electrical installation, testing, commissioning, and calibration services across India.</p><p>With over <strong>13+ years of field experience</strong> and <strong>200+ executed projects</strong>, we specialize in high-hazard environments like Thermal Power, Refineries, and Process Industries.</p>`
  );

  // Universal Modal State (Add / Edit)
  const [modalType, setModalType] = useState<TabType | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Banner Upload State
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [newBanner, setNewBanner] = useState({
    title: "",
    subtitle: "",
    media_type: "image",
    cta_text: "Discuss Your Project",
    cta_link: "/contact",
  });

  // Inquiries / Leads state
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [inquirySearch, setInquirySearch] = useState<string>("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("All");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Admin Authentication & Session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<{ id?: number; name?: string; email?: string; role?: string } | null>(null);
  const [loginEmail, setLoginEmail] = useState<string>("admin@krishnainstrumentation.com");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Change Password State & Modal
  const [changePwModal, setChangePwModal] = useState<boolean>(false);
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmNewPw, setConfirmNewPw] = useState<string>("");
  const [showCurrentPw, setShowCurrentPw] = useState<boolean>(false);
  const [showNewPw, setShowNewPw] = useState<boolean>(false);
  const [isChangingPw, setIsChangingPw] = useState<boolean>(false);
  const [pwChangeMessage, setPwChangeMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyText = (text: string, fieldName: string) => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Copied ${fieldName} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this lead/inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        showToast("Inquiry deleted successfully");
      } else {
        showToast(data.error || "Failed to delete inquiry");
      }
    } catch (err: any) {
      showToast("Error deleting inquiry");
    }
  };

  const handleUpdateInquiryStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.ok) {
        setInquiries((prev) =>
          prev.map((x) => (x.id === id ? { ...x, status: newStatus } : x))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev: any) => (prev ? { ...prev, status: newStatus } : null));
        }
        showToast(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      showToast("Failed to update status");
    }
  };

  const exportContactInquiriesCSV = () => {
    const contactList = inquiries.filter(
      (i) => (i.type || "contact").toLowerCase() !== "career"
    );
    if (contactList.length === 0) {
      showToast("No contact RFQs available to export");
      return;
    }
    const headers = [
      "RFQ Code",
      "Date",
      "Status",
      "Priority",
      "Client Name",
      "Designation / Title",
      "Company / Organization",
      "Official Email",
      "Phone Number",
      "Core Service Requested",
      "Site Location",
      "Industry / Sector",
      "Project Status",
      "Target Start Date",
      "Requirement Summary",
      "Attachment Name",
      "Attachment URL",
    ];
    const escapeCsv = (val: any) =>
      `"${String(val || "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
    const rows = contactList.map((inq) => [
      escapeCsv(inq.inquiry_code || `RFQ-${inq.id}`),
      escapeCsv(inq.created_at || ""),
      escapeCsv(inq.status || "New"),
      escapeCsv(inq.priority || "Medium"),
      escapeCsv(inq.client_name || ""),
      escapeCsv(inq.designation || ""),
      escapeCsv(inq.company || ""),
      escapeCsv(inq.email || ""),
      escapeCsv(inq.phone || ""),
      escapeCsv(inq.product_interest || ""),
      escapeCsv(inq.location || inq.quantity || ""),
      escapeCsv(inq.application || ""),
      escapeCsv(inq.project_status || ""),
      escapeCsv(inq.start_date || ""),
      escapeCsv(inq.message || ""),
      escapeCsv(inq.attachment_name || ""),
      escapeCsv(inq.attachment_url || ""),
    ]);
    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `kiw-contact-rfqs-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${contactList.length} Contact RFQs to CSV`);
  };

  const exportCareerInquiriesCSV = () => {
    const careerList = inquiries.filter(
      (i) => (i.type || "").toLowerCase() === "career"
    );
    if (careerList.length === 0) {
      showToast("No career applications available to export");
      return;
    }
    const headers = [
      "Application Code",
      "Date",
      "Status",
      "Priority",
      "Candidate Name",
      "Applied Role / Position",
      "Total Experience",
      "Current Location",
      "Preferred Location",
      "Notice Period",
      "Email Address",
      "Phone Number",
      "Candidate Message / Bio",
      "Resume Name",
      "Resume URL",
    ];
    const escapeCsv = (val: any) =>
      `"${String(val || "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
    const rows = careerList.map((inq) => [
      escapeCsv(inq.inquiry_code || `APP-${inq.id}`),
      escapeCsv(inq.created_at || ""),
      escapeCsv(inq.status || "New"),
      escapeCsv(inq.priority || "Medium"),
      escapeCsv(inq.client_name || ""),
      escapeCsv(inq.designation || inq.product_interest || ""),
      escapeCsv(inq.experience || inq.quantity || ""),
      escapeCsv(inq.location || inq.company || ""),
      escapeCsv(inq.application || ""),
      escapeCsv(inq.notice_period || ""),
      escapeCsv(inq.email || ""),
      escapeCsv(inq.phone || ""),
      escapeCsv(inq.message || ""),
      escapeCsv(inq.attachment_name || ""),
      escapeCsv(inq.attachment_url || ""),
    ]);
    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `kiw-career-applications-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${careerList.length} Job Applications to CSV`);
  };

  const safeFetchJson = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return { ok: false, data: [] };
      const ct = res.headers.get("content-type");
      if (ct && ct.includes("application/json")) {
        return await res.json();
      }
      return { ok: false, data: [] };
    } catch (e) {
      console.warn(`Error fetching ${url}:`, e);
      return { ok: false, data: [] };
    }
  };

  // Fetch all collections from SQLite DB on mount
  const fetchAllData = async () => {
    try {
      const [
        bData,
        sData,
        iData,
        pData,
        cData,
        infraData,
        carData,
        inqData,
      ] = await Promise.all([
        safeFetchJson("/api/admin/banners"),
        safeFetchJson("/api/admin/services"),
        safeFetchJson("/api/admin/industries"),
        safeFetchJson("/api/admin/projects"),
        safeFetchJson("/api/admin/clients"),
        safeFetchJson("/api/admin/infrastructure"),
        safeFetchJson("/api/admin/careers"),
        safeFetchJson("/api/admin/inquiries"),
      ]);

      if (bData.ok && Array.isArray(bData.data)) setBanners(bData.data);
      if (sData.ok && Array.isArray(sData.data)) setServices(sData.data);
      if (iData.ok && Array.isArray(iData.data)) setIndustries(iData.data);
      if (pData.ok && Array.isArray(pData.data)) setProjects(pData.data);
      if (cData.ok && Array.isArray(cData.data)) setClients(cData.data);
      if (infraData.ok && Array.isArray(infraData.data?.equipment))
        setEquipment(infraData.data.equipment);
      if (carData.ok && Array.isArray(carData.data)) setCareers(carData.data);
      if (inqData.ok && Array.isArray(inqData.data)) setInquiries(inqData.data);
    } catch (err) {
      console.error("Failed to load CMS data from DB:", err);
    }
  };

  const checkAuthSession = async () => {
    try {
      const res = await fetch("/api/admin/auth/me");
      const data = await res.json();
      if (data.ok && data.user) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        fetchAllData();
      } else {
        const savedAuth = typeof window !== "undefined" ? localStorage.getItem("kiw_admin_auth") : null;
        const savedUser = typeof window !== "undefined" ? localStorage.getItem("kiw_admin_user") : null;
        if (savedAuth === "true" && savedUser) {
          try {
            setCurrentUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
            fetchAllData();
          } catch {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      }
    } catch {
      const savedAuth = typeof window !== "undefined" ? localStorage.getItem("kiw_admin_auth") : null;
      if (savedAuth === "true") {
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        setIsAuthenticated(false);
      }
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuthSession();
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError("Please provide both email and password.");
      return;
    }
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = { ok: false, error: `Server error (${res.status})` };
      }
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("kiw_admin_auth", "true");
          localStorage.setItem("kiw_admin_user", JSON.stringify(data.user));
        }
        showToast(`Welcome back, ${data.user.name || "Admin"}!`);
        fetchAllData();
      } else {
        setLoginError(data.error || (res.status === 401 ? "Invalid email or password." : `Server error (${res.status})`));
      }
    } catch (err: any) {
      console.error("Login fetch error:", err);
      setLoginError(err?.message || "Failed to connect to authentication server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("kiw_admin_auth");
      localStorage.removeItem("kiw_admin_user");
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginPassword("");
    showToast("Logged out successfully.");
  };

  const handleChangePassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPwChangeMessage(null);
    if (!currentPw || !newPw || !confirmNewPw) {
      setPwChangeMessage({ text: "All fields are required.", isError: true });
      return;
    }
    if (newPw.length < 6) {
      setPwChangeMessage({ text: "New password must be at least 6 characters.", isError: true });
      return;
    }
    if (newPw !== confirmNewPw) {
      setPwChangeMessage({ text: "New password and confirmation do not match.", isError: true });
      return;
    }
    setIsChangingPw(true);
    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser?.email || loginEmail,
          current_password: currentPw,
          new_password: newPw,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setPwChangeMessage({ text: data.message || "Password updated successfully!", isError: false });
        showToast("Password updated successfully!");
        setCurrentPw("");
        setNewPw("");
        setConfirmNewPw("");
        setTimeout(() => {
          setChangePwModal(false);
          setPwChangeMessage(null);
        }, 2200);
      } else {
        setPwChangeMessage({ text: data.error || "Failed to update password.", isError: true });
      }
    } catch (err: any) {
      setPwChangeMessage({ text: "Server error while updating password.", isError: true });
    } finally {
      setIsChangingPw(false);
    }
  };

  const safeParseRes = async (res: Response) => {
    try {
      const ct = res.headers.get("content-type");
      if (ct && ct.includes("application/json")) {
        return await res.json();
      }
      return { ok: false, error: `Server returned non-JSON (${res.status})` };
    } catch {
      return { ok: false, error: "Failed to parse server response" };
    }
  };

  const handleUploadMediaFile = async (file: File, fieldName: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await safeParseRes(res);
      if (data.ok && data.fileUrl) {
        setEditItem((prev: any) => ({
          ...prev,
          [fieldName]: data.fileUrl,
        }));
        showToast("Image uploaded successfully!");
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      showToast("Error uploading image");
    }
  };

  // Save or Update handler
  const handleSaveItem = async () => {
    if (!modalType || !editItem) return;
    setIsSaving(true);
    try {
      const isEditing = Boolean(editItem.id);
      let endpoint = "";
      let method = isEditing ? "PUT" : "POST";

      if (modalType === "services") {
        endpoint = isEditing ? `/api/admin/services/${editItem.id}` : "/api/admin/services";
      } else if (modalType === "industries") {
        endpoint = isEditing ? `/api/admin/industries/${editItem.id}` : "/api/admin/industries";
      } else if (modalType === "projects") {
        endpoint = isEditing ? `/api/admin/projects/${editItem.id}` : "/api/admin/projects";
      } else if (modalType === "clients") {
        endpoint = isEditing ? `/api/admin/clients/${editItem.id}` : "/api/admin/clients";
      } else if (modalType === "infrastructure") {
        endpoint = isEditing
          ? `/api/admin/infrastructure/equipment/${editItem.id}`
          : "/api/admin/infrastructure/equipment";
      } else if (modalType === "careers") {
        endpoint = isEditing ? `/api/admin/careers/${editItem.id}` : "/api/admin/careers";
      }

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editItem),
      });
      const data = await safeParseRes(res);

      if (data.ok) {
        showToast(`Successfully ${isEditing ? "updated" : "created"}!`);
        setModalType(null);
        setEditItem(null);
        fetchAllData();
      } else {
        alert(data.error || "Failed to save item.");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving changes.");
    } finally {
      setIsSaving(false);
    }
  };

  // Save Page Content Section
  const handleSavePageContent = async () => {
    try {
      setIsSaving(true);
      const res = await fetch(`/api/admin/page-contents/${selectedPageKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section_key: pageSectionKey,
          title: pageSectionTitle,
          subtitle: pageSectionSubtitle,
          content: pageRichContent,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast("Page content updated and saved to SQLite DB!");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving page content.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen bg-[#070E18] items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#E76F00]/20 border-t-[#E76F00] animate-spin" />
            <Shield className="w-6 h-6 text-[#E76F00]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-white tracking-wide">Krishna Instrumentation Works</p>
            <p className="text-xs text-slate-400 font-mono">Verifying secure admin session...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070E18] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E76F00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#0B2B4C]/40 rounded-full blur-[120px] pointer-events-none" />

        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B2B4C] border border-[#E76F00] text-white px-5 py-3 rounded-xl shadow-2xl shadow-black/60 animate-bounce">
            <CheckCircle className="w-5 h-5 text-[#E76F00]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <div className="w-full max-w-md relative z-10 space-y-6 animate-fadeIn">
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2B4C] to-[#081524] border border-[#E76F00]/40 shadow-xl shadow-black/40">
              <Shield className="w-7 h-7 text-[#E76F00]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Krishna Instrumentation Works
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Industrial CMS & Management Portal
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-[#0D1829]/90 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#E76F00]" />
                <h2 className="text-sm font-bold text-white">Admin Authorization</h2>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                SECURE 256-BIT
              </span>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2.5 animate-fadeIn">
                <span className="text-rose-400 font-bold">✕</span>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Admin Email Address</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@krishnainstrumentation.com"
                    required
                    className="w-full bg-[#050E1A] border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E76F00] transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Password</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="w-full bg-[#050E1A] border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E76F00] transition font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="text-slate-500 hover:text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-[#E76F00] hover:bg-[#d46500] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#E76F00]/20 transition disabled:opacity-50 mt-2"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Autofill helper */}
            <div className="pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("admin@krishnainstrumentation.com");
                  setLoginPassword("admin123");
                  setLoginError(null);
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-400 hover:text-slate-200 transition flex items-center justify-between"
              >
                <span>Default Credentials:</span>
                <span className="font-mono text-[#E76F00] font-semibold">admin123 (Click to fill)</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition flex items-center justify-center gap-1"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0E1726] text-slate-100 font-sans overflow-x-hidden w-full max-w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B2B4C] border border-[#E76F00] text-white px-5 py-3 rounded-xl shadow-2xl shadow-black/60 animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#E76F00]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#081524] border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2B4C] to-[#E76F00] flex items-center justify-center shadow-lg shadow-[#E76F00]/20 border border-[#E76F00]/40">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white font-mono">
                KRISHNA CMS
              </h1>
              <p className="text-[11px] text-[#E76F00] font-medium tracking-widest uppercase">
                Visual & HTML Editor
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-1 flex-1 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Core Overview
          </div>

          <button
            onClick={() => {
              setActiveTab("overview");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "overview"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("banners");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "banners"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span>Hero Banner CMS</span>
            </div>
            <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
              {banners.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("page_contents");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "page_contents"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>Page Content Visual Editor</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              HTML/Visual
            </span>
          </button>

          <div className="pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Website Pages Collections
          </div>

          <button
            onClick={() => {
              setActiveTab("services");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "services"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Wrench className="w-4 h-4" />
              <span>Services ({services.length})</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("industries");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "industries"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Factory className="w-4 h-4" />
              <span>Industries ({industries.length})</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("projects");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "projects"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("clients");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "clients"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4" />
              <span>Clients & Partners ({clients.length})</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("infrastructure");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "infrastructure"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <HardHat className="w-4 h-4" />
              <span>Infrastructure Tools ({equipment.length})</span>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("careers");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "careers"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Job Openings CMS ({careers.length})</span>
            </div>
          </button>

          <div className="pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Client Leads & Recruitment
          </div>

          <button
            onClick={() => {
              setActiveTab("inquiries");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "inquiries"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>Contact RFQs & Leads</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
              {inquiries.filter((i) => (i.type || "contact").toLowerCase() !== "career").length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("career_applications");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "career_applications"
                ? "bg-sky-600 text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <UserCheck className="w-4 h-4" />
              <span>Career Applications (CVs)</span>
            </div>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">
              {inquiries.filter((i) => (i.type || "").toLowerCase() === "career").length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("settings");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === "settings"
                ? "bg-[#E76F00] text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              <span>Company Settings</span>
            </div>
          </button>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px]">SQLite Real DB</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase">
              Connected
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Website</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT SHELL */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 w-full max-w-full overflow-x-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0B1728]/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="font-semibold text-white capitalize">{activeTab}</span>
              <span>/</span>
              <span className="text-xs text-slate-400 font-mono">Visual WYSIWYG & HTML</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchAllData();
                showToast("Data refreshed from SQLite DB.");
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setChangePwModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700/60 transition shadow-sm"
              title="Change Admin Password"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#E76F00]" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B2B4C] to-[#081524] border border-[#E76F00] flex items-center justify-center text-xs font-bold text-[#E76F00]">
                {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : "KI"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-white leading-tight">
                  {currentUser?.name || "Krishna Admin"}
                </p>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                  {currentUser?.role ? `${currentUser.role.toUpperCase()} (ONLINE)` : "SUPER ADMIN"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition flex items-center gap-1 text-xs font-semibold"
              title="Logout Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1 w-full max-w-[1360px] min-w-0 mx-auto space-y-8 overflow-x-hidden">
          {/* ================= 1. OVERVIEW ================= */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B2B4C] via-[#0D3B66] to-[#124E78] border border-blue-500/20 p-6 sm:p-8 text-white shadow-xl">
                <span className="inline-flex items-center gap-1.5 bg-[#E76F00]/20 border border-[#E76F00]/40 text-[#E76F00] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" /> Full Visual WYSIWYG & HTML Editor Active
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Content Management & Visual Rich Text Portal
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                  You can add, edit, format with rich visual styles, inspect raw HTML code, and permanently update all website pages and structured data.
                </p>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                <div
                  onClick={() => setActiveTab("inquiries")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-[#E76F00] transition"
                >
                  <div className="text-amber-400 text-xs font-semibold">Contact RFQs</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {inquiries.filter((i) => (i.type || "contact").toLowerCase() !== "career").length}
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("career_applications")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-sky-500 transition"
                >
                  <div className="text-sky-400 text-xs font-semibold">Candidate CVs</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {inquiries.filter((i) => (i.type || "").toLowerCase() === "career").length}
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("services")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-[#E76F00] transition"
                >
                  <div className="text-slate-400 text-xs font-medium">Services</div>
                  <div className="text-2xl font-bold text-white mt-1">{services.length}</div>
                </div>

                <div
                  onClick={() => setActiveTab("industries")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-[#E76F00] transition"
                >
                  <div className="text-slate-400 text-xs font-medium">Industries</div>
                  <div className="text-2xl font-bold text-white mt-1">{industries.length}</div>
                </div>

                <div
                  onClick={() => setActiveTab("projects")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-[#E76F00] transition"
                >
                  <div className="text-slate-400 text-xs font-medium">Projects</div>
                  <div className="text-2xl font-bold text-white mt-1">{projects.length}</div>
                </div>

                <div
                  onClick={() => setActiveTab("clients")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-[#E76F00] transition"
                >
                  <div className="text-slate-400 text-xs font-medium">Clients</div>
                  <div className="text-2xl font-bold text-white mt-1">{clients.length}</div>
                </div>

                <div
                  onClick={() => setActiveTab("infrastructure")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-[#E76F00] transition"
                >
                  <div className="text-slate-400 text-xs font-medium">Test Tools</div>
                  <div className="text-2xl font-bold text-white mt-1">{equipment.length}</div>
                </div>

                <div
                  onClick={() => setActiveTab("careers")}
                  className="bg-[#111C2E] border border-slate-800 p-3.5 rounded-2xl cursor-pointer hover:border-[#E76F00] transition"
                >
                  <div className="text-slate-400 text-xs font-medium">Job CMS</div>
                  <div className="text-2xl font-bold text-white mt-1">{careers.length}</div>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE CONTENT VISUAL & HTML EDITOR TAB ================= */}
          {activeTab === "page_contents" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#E76F00]" />
                    <span>Page Content Visual & HTML Editor</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Edit static page bodies, company story, policies, and overview sections with live formatting
                  </p>
                </div>

                <button
                  onClick={handleSavePageContent}
                  disabled={isSaving}
                  className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving to DB..." : "Save Page Content"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Config Controls */}
                <div className="bg-[#111C2E] border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="font-bold text-sm text-white">Target Page & Section</h3>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Select Page</label>
                    <select
                      value={selectedPageKey}
                      onChange={(e) => setSelectedPageKey(e.target.value)}
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E76F00]"
                    >
                      <option value="about-us">About Us Page (/about-us)</option>
                      <option value="contact">Contact Page (/contact)</option>
                      <option value="quality-safety">Quality & Safety Page (/quality-safety)</option>
                      <option value="infrastructure">Infrastructure Page (/infrastructure)</option>
                      <option value="home">Homepage Additional Sections (/)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Section Identifier</label>
                    <input
                      type="text"
                      value={pageSectionKey}
                      onChange={(e) => setPageSectionKey(e.target.value)}
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Section Title</label>
                    <input
                      type="text"
                      value={pageSectionTitle}
                      onChange={(e) => setPageSectionTitle(e.target.value)}
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Subtitle</label>
                    <input
                      type="text"
                      value={pageSectionSubtitle}
                      onChange={(e) => setPageSectionSubtitle(e.target.value)}
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                </div>

                {/* Right Visual / HTML Editor */}
                <div className="lg:col-span-2 bg-[#111C2E] border border-slate-800 p-5 rounded-2xl space-y-3">
                  <RichEditor
                    label="Page Body Rich Text / HTML Content"
                    value={pageRichContent}
                    onChange={setPageRichContent}
                    minHeight="320px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. SERVICES CMS ================= */}
          {activeTab === "services" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Services CMS ({services.length})</h2>
                  <p className="text-xs text-slate-400">
                    Add new services or edit existing scopes with the Visual / HTML Editor
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalType("services");
                    setEditItem({
                      title: "",
                      slug: "",
                      icon_name: "Wrench",
                      short_desc: "",
                      bullets: ["Installation and cabling", "Testing and verification"],
                    });
                  }}
                  className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((s) => {
                  const SvcIcon = getDynamicIcon(s.icon_name, Wrench);
                  return (
                    <div
                      key={s.id}
                      className="bg-[#111C2E] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-[#0B2B4C] border border-[#E76F00]/30 flex items-center justify-center text-[#E76F00] shadow-sm">
                            <SvcIcon className="w-4 h-4" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-[#E76F00] bg-[#E76F00]/10 px-2 py-0.5 rounded border border-[#E76F00]/20 font-semibold">
                              {s.icon_name || "Wrench"}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                              /{s.slug}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-sm text-white">{s.title}</h3>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {s.short_desc}
                          </p>
                        </div>

                        <div className="space-y-1 text-xs text-slate-300">
                          {s.bullets?.slice(0, 3).map((b, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                              <span className="w-1 h-1 rounded-full bg-[#E76F00]" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setModalType("services");
                            setEditItem(s);
                          }}
                          className="px-3 py-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg text-xs flex items-center gap-1.5 border border-blue-500/20"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Content
                        </button>

                        <button
                          onClick={async () => {
                            if (confirm(`Delete service "${s.title}"?`)) {
                              await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" });
                              setServices(services.filter((x) => x.id !== s.id));
                              showToast("Service deleted.");
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 3. INDUSTRIES CMS ================= */}
          {activeTab === "industries" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Target Industries CMS ({industries.length})</h2>
                  <p className="text-xs text-slate-400">
                    Add new industrial sectors or edit process challenges
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalType("industries");
                    setEditItem({
                      title: "",
                      slug: "",
                      icon_name: "Factory",
                      short_desc: "",
                      challenge: "",
                      image_url: "",
                    });
                  }}
                  className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Industry
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {industries.map((ind) => {
                  const IndIcon = getDynamicIcon(ind.icon_name, Factory);
                  return (
                    <div
                      key={ind.id}
                      className="bg-[#111C2E] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#0B2B4C] border border-[#E76F00]/30 flex items-center justify-center text-[#E76F00] flex-shrink-0 shadow-sm">
                              <IndIcon className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-sm text-white">{ind.title}</h3>
                          </div>
                          <span className="text-[10px] font-mono text-[#E76F00] bg-[#E76F00]/10 px-2 py-0.5 rounded border border-[#E76F00]/20">
                            {ind.slug}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {ind.short_desc}
                        </p>

                        {ind.challenge && (
                          <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                            <span className="text-[#E76F00] font-semibold">Challenge: </span>
                            {ind.challenge}
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setModalType("industries");
                            setEditItem(ind);
                          }}
                          className="px-3 py-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg text-xs flex items-center gap-1.5 border border-blue-500/20"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Sector
                        </button>

                        <button
                          onClick={async () => {
                            if (confirm(`Delete industry "${ind.title}"?`)) {
                              await fetch(`/api/admin/industries/${ind.id}`, { method: "DELETE" });
                              setIndustries(industries.filter((x) => x.id !== ind.id));
                              showToast("Industry sector removed.");
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 4. PROJECTS CMS ================= */}
          {activeTab === "projects" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Industrial Projects Portfolio ({projects.length})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add new project records or edit scope, client & outcome
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalType("projects");
                    setEditItem({
                      title: "",
                      slug: `proj-${Date.now().toString().slice(-4)}`,
                      client: "",
                      location: "",
                      industry: "Oil & Gas",
                      service: "Instrumentation Installation",
                      status: "Completed",
                      period: "2024",
                      scope: "",
                      outcome: "",
                    });
                  }}
                  className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
              </div>

              <div className="bg-[#111C2E] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#081524] border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                      <tr>
                        <th className="px-5 py-3.5">Project & Client</th>
                        <th className="px-5 py-3.5">Sector</th>
                        <th className="px-5 py-3.5">Location & Period</th>
                        <th className="px-5 py-3.5">Scope Highlights</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {projects.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition">
                          <td className="px-5 py-4">
                            <div className="font-bold text-white text-sm">{p.title}</div>
                            <div className="text-[#E76F00] font-medium text-xs mt-0.5">
                              {p.client}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded text-[11px] border border-slate-700">
                              {p.industry}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div>{p.location}</div>
                            <div className="text-slate-400 text-[11px] font-mono">
                              {p.period}
                            </div>
                          </td>
                          <td className="px-5 py-4 max-w-xs text-slate-300 line-clamp-2">
                            {p.scope}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                p.status === "Completed"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setModalType("projects");
                                  setEditItem(p);
                                }}
                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg border border-blue-500/20"
                                title="Edit Project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Delete project "${p.title}"?`)) {
                                    await fetch(`/api/admin/projects/${p.id}`, { method: "DELETE" });
                                    setProjects(projects.filter((x) => x.id !== p.id));
                                    showToast("Project deleted.");
                                  }
                                }}
                                className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. CLIENTS CMS ================= */}
          {activeTab === "clients" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Client & Technology Partners ({clients.length})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add new client partner records or edit verified scopes
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalType("clients");
                    setEditItem({
                      name: "",
                      role: "Site Owner & Direct Client",
                      description: "",
                      status: "Verified Scope",
                      logo_url: "/kiw-logo-1.png",
                      image_url: "/about-us/1.jpeg",
                    });
                  }}
                  className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Client
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {clients.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#111C2E] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-white/95 p-1.5 flex items-center justify-center border border-slate-700 shadow-sm">
                          <img
                            src={c.logo_url || "/kiw-logo-1.png"}
                            alt={c.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                          {c.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-white">{c.name}</h3>
                        <div className="text-[11px] text-[#E76F00] font-medium mt-0.5">{c.role}</div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setModalType("clients");
                          setEditItem(c);
                        }}
                        className="px-3 py-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg text-xs flex items-center gap-1.5 border border-blue-500/20"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Partner
                      </button>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete client "${c.name}"?`)) {
                            await fetch(`/api/admin/clients/${c.id}`, { method: "DELETE" });
                            setClients(clients.filter((x) => x.id !== c.id));
                            showToast("Client partner removed.");
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 6. INFRASTRUCTURE & TOOLS CMS ================= */}
          {activeTab === "infrastructure" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Calibration & Testing Equipment Registry ({equipment.length})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Master calibrators, Fluke, Ametek, and Druck testing benches in active inventory
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalType("infrastructure");
                    setEditItem({
                      name: "",
                      category: "Calibration Equipment",
                      manufacturer: "Fluke Corporation",
                      model: "Fluke 754",
                      qty: "5 Units",
                      calibration_status: "Verified Active",
                      last_cal_date: "2026-03-12",
                      use_case: "Field loop calibration",
                      availability: "Available",
                    });
                  }}
                  className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add Equipment
                </button>
              </div>

              <div className="bg-[#111C2E] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#081524] border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                      <tr>
                        <th className="px-5 py-3.5">Equipment / Tool</th>
                        <th className="px-5 py-3.5">Category</th>
                        <th className="px-5 py-3.5">Manufacturer & Model</th>
                        <th className="px-5 py-3.5">Units</th>
                        <th className="px-5 py-3.5">Calibration Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {equipment.map((eq) => (
                        <tr key={eq.id} className="hover:bg-slate-800/40 transition">
                          <td className="px-5 py-4 font-bold text-white">{eq.name}</td>
                          <td className="px-5 py-4">{eq.category}</td>
                          <td className="px-5 py-4">
                            {eq.manufacturer} • <span className="font-mono">{eq.model}</span>
                          </td>
                          <td className="px-5 py-4 font-mono font-semibold text-[#E76F00]">
                            {eq.qty}
                          </td>
                          <td className="px-5 py-4">
                            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
                              {eq.calibration_status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setModalType("infrastructure");
                                  setEditItem(eq);
                                }}
                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg border border-blue-500/20"
                                title="Edit Tool"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Delete equipment "${eq.name}"?`)) {
                                    await fetch(`/api/admin/infrastructure/equipment/${eq.id}`, {
                                      method: "DELETE",
                                    });
                                    setEquipment(equipment.filter((x) => x.id !== eq.id));
                                    showToast("Equipment removed.");
                                  }
                                }}
                                className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                                title="Delete Tool"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 7. CAREERS CMS ================= */}
          {activeTab === "careers" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Career Openings & Talent Segments CMS ({careers.length})</h2>
                  <p className="text-xs text-slate-400">
                    Add new job postings or edit talent categories, roles & requirements
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalType("careers");
                    setEditItem({
                      title: "",
                      department: "Control & Instrumentation",
                      experience: "2 - 5 Years",
                      location: "PAN India Project Sites",
                      job_type: "Full-time",
                      description: "",
                      icon_name: "Briefcase",
                      role_value: "",
                      requirements: ["Engineering diploma/degree", "Site experience"],
                    });
                  }}
                  className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add Career Opening
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {careers.map((car) => {
                  const CarIcon = getDynamicIcon(car.icon_name, Briefcase);
                  return (
                    <div
                      key={car.id}
                      className="bg-[#111C2E] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-[#0B2B4C] border border-[#E76F00]/30 flex items-center justify-center text-[#E76F00] shadow-sm">
                            <CarIcon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-semibold text-[#E76F00] bg-[#E76F00]/10 px-2.5 py-1 rounded-full border border-[#E76F00]/20">
                            {car.department}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-base text-white">{car.title}</h3>
                          {car.role_value && (
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                              Role: <span className="text-slate-200">{car.role_value}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono">
                            Exp: {car.experience}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] truncate">
                            <MapPin className="w-3 h-3 text-slate-500" /> {car.location}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                          {car.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setModalType("careers");
                            setEditItem(car);
                          }}
                          className="px-3 py-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg text-xs flex items-center gap-1.5 border border-blue-500/20"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Role
                        </button>

                        <button
                          onClick={async () => {
                            if (confirm(`Delete opening "${car.title}"?`)) {
                              await fetch(`/api/admin/careers/${car.id}`, { method: "DELETE" });
                              setCareers(careers.filter((x) => x.id !== car.id));
                              showToast("Career opening removed.");
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 8. HERO BANNERS ================= */}
          {activeTab === "banners" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-white">Homepage Hero Banners ({banners.length})</h2>
                <p className="text-xs text-slate-400">
                  Manage background videos (.mp4), hero slider images, and titles
                </p>
              </div>

              {/* Upload Card */}
              <div className="bg-[#111C2E] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#E76F00]" />
                  <span>Upload & Set New Banner</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Title</label>
                    <input
                      type="text"
                      value={newBanner.title}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, title: e.target.value })
                      }
                      placeholder="e.g. Next-Gen Level & Pressure Solutions"
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Sub-Heading</label>
                    <input
                      type="text"
                      value={newBanner.subtitle}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, subtitle: e.target.value })
                      }
                      placeholder="e.g. Engineered for High Precision & Reliability"
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">
                      Media File (Video MP4 / Image)
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/mp4,video/webm"
                      onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2 text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#E76F00] file:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Button Text</label>
                      <input
                        type="text"
                        value={newBanner.cta_text}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, cta_text: e.target.value })
                        }
                        className="w-full bg-[#081524] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Button Link</label>
                      <input
                        type="text"
                        value={newBanner.cta_link}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, cta_link: e.target.value })
                        }
                        className="w-full bg-[#081524] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={async () => {
                      if (!bannerFile && !newBanner.title) {
                        showToast("Please provide a title and select a media file.");
                        return;
                      }
                      setIsUploadingBanner(true);
                      try {
                        let mediaUrl = "/kiw-hero-video.mp4";
                        let mediaType = bannerFile?.type?.startsWith("video")
                          ? "video"
                          : "image";

                        if (bannerFile) {
                          const formData = new FormData();
                          formData.append("file", bannerFile);
                          const res = await fetch("/api/admin/banners/upload", {
                            method: "POST",
                            body: formData,
                          });
                          const data = await res.json();
                          if (data.ok) {
                            mediaUrl = data.fileUrl;
                            mediaType = data.mediaType;
                          }
                        }

                        const saveRes = await fetch("/api/admin/banners", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            title: newBanner.title,
                            subtitle: newBanner.subtitle,
                            media_type: mediaType,
                            media_url: mediaUrl,
                            cta_text: newBanner.cta_text,
                            cta_link: newBanner.cta_link,
                          }),
                        });
                        const saveResult = await saveRes.json();
                        if (saveResult.ok && saveResult.data) {
                          setBanners([saveResult.data, ...banners]);
                          showToast("Banner published successfully!");
                          setBannerFile(null);
                          setNewBanner({
                            title: "",
                            subtitle: "",
                            media_type: "image",
                            cta_text: "Discuss Your Project",
                            cta_link: "/contact",
                          });
                        }
                      } catch (err) {
                        console.error(err);
                        showToast("Error uploading banner.");
                      } finally {
                        setIsUploadingBanner(false);
                      }
                    }}
                    disabled={isUploadingBanner}
                    className="bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
                  >
                    {isUploadingBanner ? "Uploading..." : "Publish Banner"}
                  </button>
                </div>
              </div>

              {/* Banners List */}
              <div className="bg-[#111C2E] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">
                  Active Homepage Banners ({banners.length})
                </div>
                <div className="divide-y divide-slate-800/70">
                  {banners.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#E76F00] bg-[#E76F00]/10 px-2 py-0.5 rounded border border-[#E76F00]/20 font-bold">
                            {b.media_type === "video" ? "🎬 Video" : "🖼️ Image"}
                          </span>
                          <h4 className="text-sm font-bold text-white">{b.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{b.subtitle}</p>
                        <div className="text-[11px] font-mono text-slate-500">
                          {b.media_url}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={async () => {
                            if (confirm(`Permanently delete "${b.title}"?`)) {
                              await fetch(`/api/admin/banners/${b.id}`, {
                                method: "DELETE",
                              });
                              setBanners(banners.filter((x) => x.id !== b.id));
                              showToast("Banner deleted.");
                            }
                          }}
                          className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 9. CONTACT RFQS & QUOTATIONS ================= */}
          {activeTab === "inquiries" && (() => {
            const contactList = inquiries.filter(
              (inq) => (inq.type || "contact").toLowerCase() !== "career"
            );
            const filteredInquiries = contactList.filter((inq) => {
              const matchesStatus =
                inquiryStatusFilter === "All" ||
                (inq.status || "New").toLowerCase() === inquiryStatusFilter.toLowerCase();
              const term = inquirySearch.toLowerCase().trim();
              const matchesSearch =
                !term ||
                (inq.inquiry_code || "").toLowerCase().includes(term) ||
                (inq.client_name || "").toLowerCase().includes(term) ||
                (inq.designation || "").toLowerCase().includes(term) ||
                (inq.company || "").toLowerCase().includes(term) ||
                (inq.email || "").toLowerCase().includes(term) ||
                (inq.phone || "").toLowerCase().includes(term) ||
                (inq.product_interest || "").toLowerCase().includes(term) ||
                (inq.location || "").toLowerCase().includes(term) ||
                (inq.message || "").toLowerCase().includes(term);
              return matchesStatus && matchesSearch;
            });

            return (
              <div className="space-y-6 animate-fadeIn">
                {/* Header & CSV Export */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111C2E] p-6 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white">
                        Contact RFQs & Quotations Registry
                      </h2>
                      <span className="bg-[#E76F00]/20 text-[#E76F00] font-bold text-xs px-2.5 py-0.5 rounded-full border border-[#E76F00]/30 font-mono">
                        {contactList.length} Total RFQs
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Project specifications, shutdown proposals, and estimation inquiries received via Contact Page (/contact)
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={exportContactInquiriesCSV}
                      className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export RFQs (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#081524] p-3 rounded-2xl border border-slate-800">
                  {/* Status Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                    {["All", "New", "In Review", "Quoted", "Closed"].map((st) => {
                      const count =
                        st === "All"
                          ? contactList.length
                          : contactList.filter(
                              (i) => (i.status || "New").toLowerCase() === st.toLowerCase()
                            ).length;
                      const isActive = inquiryStatusFilter === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setInquiryStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                            isActive
                              ? "bg-[#E76F00] text-white font-semibold shadow-sm"
                              : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          <span>{st}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                              isActive
                                ? "bg-black/20 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      placeholder="Search name, company, service..."
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E76F00]"
                    />
                    {inquirySearch && (
                      <button
                        type="button"
                        onClick={() => setInquirySearch("")}
                        className="text-slate-400 hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Contact Inquiries Cards Grid */}
                <div className="space-y-4">
                  {filteredInquiries.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 bg-[#111C2E] rounded-2xl border border-slate-800 space-y-2">
                      <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="font-semibold text-white">No Contact RFQs found</p>
                      <p className="text-xs text-slate-500">
                        {contactList.length === 0
                          ? "When clients submit RFQs or quotation forms on the Contact page, they will appear here."
                          : "Try adjusting your search terms or filter selection."}
                      </p>
                    </div>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-[#111C2E] border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4 hover:border-slate-700 transition shadow-sm relative group"
                      >
                        {/* Top Row: Code, Company, Status, Timestamp & Quick Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-xs font-bold text-[#E76F00] bg-[#E76F00]/10 px-2.5 py-1 rounded-md border border-[#E76F00]/20">
                              {inq.inquiry_code || `RFQ-${inq.id}`}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {inq.company || inq.client_name}
                            </span>
                            {inq.designation && (
                              <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 font-medium">
                                {inq.designation}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                              {inq.created_at || "Recent"}
                            </span>
                            <select
                              value={inq.status || "New"}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className="bg-[#081524] border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:border-[#E76F00]"
                            >
                              <option value="New">🟢 New</option>
                              <option value="In Review">🟡 In Review</option>
                              <option value="Quoted">🔵 Quoted</option>
                              <option value="Closed">⚪ Closed</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                              title="View Complete Lead Details"
                              className="p-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-lg border border-sky-500/20 transition flex items-center gap-1 text-xs font-medium"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Details</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              title="Delete Lead"
                              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Middle Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#081524] p-3.5 rounded-xl border border-slate-800/80">
                          <div>
                            <span className="text-slate-400 block text-[11px]">Contact Person</span>
                            <span className="font-semibold text-slate-200 mt-0.5 block">{inq.client_name}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Official Email</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <a
                                href={`mailto:${inq.email}`}
                                className="text-[#E76F00] hover:underline font-mono truncate"
                              >
                                {inq.email}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyText(inq.email, "Email")}
                                className="text-slate-500 hover:text-slate-300"
                                title="Copy email"
                              >
                                {copiedField === "Email" ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Phone Number</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <a
                                href={`tel:${inq.phone}`}
                                className="text-slate-200 hover:text-white font-mono"
                              >
                                {inq.phone}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyText(inq.phone, "Phone")}
                                className="text-slate-500 hover:text-slate-300"
                                title="Copy phone"
                              >
                                {copiedField === "Phone" ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Scope & Schedule Pills */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-[11px] font-semibold text-[#E76F00]">
                              Core Service:
                            </span>
                            <span className="text-xs text-white font-medium bg-slate-800/70 px-2.5 py-0.5 rounded border border-slate-700/60">
                              {inq.product_interest || "General RFQ / Quotation"}
                            </span>
                            {(inq.location || inq.quantity) && (
                              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                                Site: {inq.location || inq.quantity}
                              </span>
                            )}
                            {inq.application && (
                              <span className="text-[11px] bg-slate-800/60 text-slate-300 px-2 py-0.5 rounded">
                                Industry: {inq.application}
                              </span>
                            )}
                            {inq.project_status && (
                              <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">
                                Status: {inq.project_status}
                              </span>
                            )}
                            {inq.start_date && (
                              <span className="text-[11px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded font-medium">
                                Start: {inq.start_date}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 leading-relaxed italic line-clamp-2">
                            &quot;{inq.message}&quot;
                          </p>

                          {/* Attachment Indicator on Card */}
                          {inq.attachment_url && (
                            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#081524] rounded-xl border border-emerald-500/20 text-xs">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                  <Paperclip className="w-3.5 h-3.5" />
                                </span>
                                <div className="truncate">
                                  <span className="text-slate-200 font-medium text-[11px] block truncate">
                                    {inq.attachment_name || "Attached Specification Sheet / BoQ"}
                                  </span>
                                  {inq.attachment_size && (
                                    <span className="text-[10px] text-slate-500 font-mono">
                                      {inq.attachment_size}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <a
                                  href={inq.attachment_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-[11px] font-semibold rounded-lg border border-emerald-500/30 flex items-center gap-1 transition"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View Document</span>
                                </a>
                                <a
                                  href={inq.attachment_url}
                                  download={inq.attachment_name || true}
                                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
                                  title="Download Document"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/50">
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(inq)}
                            className="text-xs text-[#E76F00] hover:text-[#ff851a] font-semibold flex items-center gap-1.5 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full RFQ Dossier</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${inq.email}?subject=RE:%20${encodeURIComponent(
                                inq.inquiry_code || "RFQ"
                              )}%20-%20Krishna%20Instrumentation%20Works`}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </a>
                            <a
                              href={`tel:${inq.phone}`}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-medium flex items-center gap-1 transition"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })()}

          {/* ================= 9.2 CAREER APPLICATIONS & RESUMES ================= */}
          {activeTab === "career_applications" && (() => {
            const careerList = inquiries.filter(
              (inq) => (inq.type || "").toLowerCase() === "career"
            );
            const filteredCareers = careerList.filter((inq) => {
              const matchesStatus =
                inquiryStatusFilter === "All" ||
                (inq.status || "New").toLowerCase() === inquiryStatusFilter.toLowerCase();
              const term = inquirySearch.toLowerCase().trim();
              const matchesSearch =
                !term ||
                (inq.inquiry_code || "").toLowerCase().includes(term) ||
                (inq.client_name || "").toLowerCase().includes(term) ||
                (inq.designation || "").toLowerCase().includes(term) ||
                (inq.product_interest || "").toLowerCase().includes(term) ||
                (inq.location || "").toLowerCase().includes(term) ||
                (inq.experience || "").toLowerCase().includes(term) ||
                (inq.email || "").toLowerCase().includes(term) ||
                (inq.phone || "").toLowerCase().includes(term) ||
                (inq.message || "").toLowerCase().includes(term);
              return matchesStatus && matchesSearch;
            });

            return (
              <div className="space-y-6 animate-fadeIn">
                {/* Header & CSV Export */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111C2E] p-6 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white">
                        Career Applications & Candidate CVs
                      </h2>
                      <span className="bg-sky-500/20 text-sky-400 font-bold text-xs px-2.5 py-0.5 rounded-full border border-sky-500/30 font-mono">
                        {careerList.length} Candidates
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Candidate job applications, field experience logs, and resumes received via Careers Page (/careers)
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={exportCareerInquiriesCSV}
                      className="px-4 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 hover:text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center gap-2 transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CVs (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#081524] p-3 rounded-2xl border border-slate-800">
                  {/* Status Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                    {["All", "New", "Under Review", "Shortlisted", "Interview Scheduled", "Hired", "Rejected"].map((st) => {
                      const count =
                        st === "All"
                          ? careerList.length
                          : careerList.filter(
                              (i) => (i.status || "New").toLowerCase() === st.toLowerCase()
                            ).length;
                      const isActive = inquiryStatusFilter === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setInquiryStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                            isActive
                              ? "bg-sky-600 text-white font-semibold shadow-sm"
                              : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          <span>{st}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                              isActive
                                ? "bg-black/20 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      placeholder="Search role, candidate, location..."
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    {inquirySearch && (
                      <button
                        type="button"
                        onClick={() => setInquirySearch("")}
                        className="text-slate-400 hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Careers Cards Grid */}
                <div className="space-y-4">
                  {filteredCareers.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 bg-[#111C2E] rounded-2xl border border-slate-800 space-y-2">
                      <UserCheck className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="font-semibold text-white">No Job Applications found</p>
                      <p className="text-xs text-slate-500">
                        {careerList.length === 0
                          ? "When candidates apply for positions on the Careers page, their profiles and CVs will appear here."
                          : "Try adjusting your search terms or status filter."}
                      </p>
                    </div>
                  ) : (
                    filteredCareers.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-[#111C2E] border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4 hover:border-slate-700 transition shadow-sm relative group"
                      >
                        {/* Top Row: Code, Applied Role, Status & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                              {inq.inquiry_code || `APP-${inq.id}`}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {inq.client_name}
                            </span>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E76F00]/20 text-[#E76F00] border border-[#E76F00]/30">
                              {inq.designation || inq.product_interest || "Job Applicant"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                              {inq.created_at || "Recent"}
                            </span>
                            <select
                              value={inq.status || "New"}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className="bg-[#081524] border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:border-sky-500"
                            >
                              <option value="New">🟢 New</option>
                              <option value="Under Review">🟡 Under Review</option>
                              <option value="Shortlisted">🔵 Shortlisted</option>
                              <option value="Interview Scheduled">🟣 Interview Scheduled</option>
                              <option value="Hired">🏆 Hired</option>
                              <option value="Rejected">⚪ Rejected</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                              title="View Complete Candidate Dossier"
                              className="p-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-lg border border-sky-500/20 transition flex items-center gap-1 text-xs font-medium"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Profile</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              title="Delete Application"
                              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Candidate Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-[#081524] p-3.5 rounded-xl border border-slate-800/80">
                          <div>
                            <span className="text-slate-400 block text-[11px]">Experience</span>
                            <span className="font-semibold text-white mt-0.5 block">{inq.experience || inq.quantity || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Current Location</span>
                            <span className="font-semibold text-slate-200 mt-0.5 block">{inq.location || inq.company || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Email Address</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <a
                                href={`mailto:${inq.email}`}
                                className="text-sky-400 hover:underline font-mono truncate"
                              >
                                {inq.email}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyText(inq.email, "Email")}
                                className="text-slate-500 hover:text-slate-300"
                                title="Copy email"
                              >
                                {copiedField === "Email" ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Phone Number</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <a
                                href={`tel:${inq.phone}`}
                                className="text-slate-200 hover:text-white font-mono"
                              >
                                {inq.phone}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyText(inq.phone, "Phone")}
                                className="text-slate-500 hover:text-slate-300"
                                title="Copy phone"
                              >
                                {copiedField === "Phone" ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Preferences & Bio */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            {inq.application && (
                              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                                {inq.application}
                              </span>
                            )}
                            {inq.notice_period && (
                              <span className="text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-medium">
                                Notice: {inq.notice_period}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 leading-relaxed italic line-clamp-2">
                            &quot;{inq.message}&quot;
                          </p>

                          {/* Resume Attachment Pill on Card */}
                          {inq.attachment_url ? (
                            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#081524] rounded-xl border border-sky-500/30 text-xs">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                                  <Paperclip className="w-3.5 h-3.5" />
                                </span>
                                <div className="truncate">
                                  <span className="text-white font-semibold text-[11px] block truncate">
                                    {inq.attachment_name || "Candidate Resume / CV"}
                                  </span>
                                  {inq.attachment_size && (
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {inq.attachment_size}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <a
                                  href={inq.attachment_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 text-[11px] font-semibold rounded-lg border border-sky-500/30 flex items-center gap-1 transition"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View Resume</span>
                                </a>
                                <a
                                  href={inq.attachment_url}
                                  download={inq.attachment_name || true}
                                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
                                  title="Download Resume"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 bg-slate-900/40 rounded-lg text-[11px] text-slate-500 italic">
                              No resume document uploaded.
                            </div>
                          )}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/50">
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(inq)}
                            className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Candidate Profile</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${inq.email}?subject=Job%20Application%20Update%20-%20Krishna%20Instrumentation%20Works`}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email Candidate</span>
                            </a>
                            <a
                              href={`tel:${inq.phone}`}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-medium flex items-center gap-1 transition"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })()}

          {/* ================= 10. SETTINGS ================= */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fadeIn max-w-[900px] w-full min-w-0">
              <div>
                <h2 className="text-xl font-bold text-white">Company Profile & Security Settings</h2>
                <p className="text-xs text-slate-400">
                  Configure corporate credentials, contact emails, and manage admin portal access passwords
                </p>
              </div>

              {/* Company Profile Card */}
              <div className="bg-[#111C2E] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Building2 className="w-4 h-4 text-[#E76F00]" />
                  <span>Company Profile Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Company Name</label>
                    <input
                      type="text"
                      defaultValue="Krishna Instrumentation Works"
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="info@krishnainstrumentation.com"
                      className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => showToast("Company profile settings saved.")}
                    className="bg-[#E76F00] hover:bg-[#d46500] text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
                  >
                    Save Company Profile
                  </button>
                </div>
              </div>

              {/* Admin Security & Password Card */}
              <div className="bg-[#111C2E] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#E76F00]" />
                    <span>Admin Security & Password Credentials</span>
                  </h3>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                    Active Account: {currentUser?.email || "admin@krishnainstrumentation.com"}
                  </span>
                </div>

                {pwChangeMessage && (
                  <div
                    className={`p-3 rounded-xl border flex items-center gap-2 text-xs animate-fadeIn ${
                      pwChangeMessage.isError
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    }`}
                  >
                    <span>{pwChangeMessage.isError ? "✕" : "✓"}</span>
                    <span>{pwChangeMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold block">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPw ? "text" : "password"}
                          value={currentPw}
                          onChange={(e) => setCurrentPw(e.target.value)}
                          placeholder="Current password"
                          className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 pr-8 text-white focus:outline-none focus:border-[#E76F00] font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPw(!showCurrentPw)}
                          className="text-slate-500 hover:text-slate-300 absolute right-2.5 top-1/2 -translate-y-1/2"
                        >
                          {showCurrentPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold block">New Password (Min 6 chars)</label>
                      <div className="relative">
                        <input
                          type={showNewPw ? "text" : "password"}
                          value={newPw}
                          onChange={(e) => setNewPw(e.target.value)}
                          placeholder="New password"
                          className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 pr-8 text-white focus:outline-none focus:border-[#E76F00] font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPw(!showNewPw)}
                          className="text-slate-500 hover:text-slate-300 absolute right-2.5 top-1/2 -translate-y-1/2"
                        >
                          {showNewPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold block">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmNewPw}
                        onChange={(e) => setConfirmNewPw(e.target.value)}
                        placeholder="Re-type new password"
                        className="w-full bg-[#081524] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00] font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <p className="text-[11px] text-slate-500">
                      Password updates take effect immediately for all future login sessions.
                    </p>
                    <button
                      type="submit"
                      disabled={isChangingPw}
                      className="bg-[#E76F00] hover:bg-[#d46500] text-white font-semibold px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>{isChangingPw ? "Updating..." : "Update Password"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= UNIVERSAL ADD / EDIT MODAL WITH RICH EDITOR ================= */}
      {modalType && editItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1728] border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#081524]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#E76F00]" />
                <h3 className="font-bold text-sm text-white capitalize">
                  {editItem.id ? `Edit ${modalType.slice(0, -1)}` : `Add New ${modalType.slice(0, -1)}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setModalType(null);
                  setEditItem(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Title / Name */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">
                  {modalType === "clients" ? "Client Name" : "Title / Heading"}
                </label>
                <input
                  type="text"
                  value={editItem.title || editItem.name || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      title: e.target.value,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E76F00]"
                />
              </div>

              {/* Slug or Role */}
              {editItem.slug !== undefined && (
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Slug URL identifier</label>
                  <input
                    type="text"
                    value={editItem.slug || ""}
                    onChange={(e) => setEditItem({ ...editItem, slug: e.target.value })}
                    className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-[#E76F00]"
                  />
                </div>
              )}

              {/* Icon Selector for Services, Industries & Careers */}
              {(modalType === "services" || modalType === "industries" || modalType === "careers") && (
                <div className="p-4 bg-[#081524] border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      {modalType === "services" ? "Service Icon" : modalType === "industries" ? "Industry Icon" : "Career Role Icon"} (
                      <span className="text-[#E76F00] font-mono">
                        {editItem.icon_name || (modalType === "services" ? "Wrench" : modalType === "industries" ? "Factory" : "Briefcase")}
                      </span>
                      )
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Click to choose or type custom icon name
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Active Icon Preview */}
                    <div className="w-12 h-12 rounded-xl bg-[#0B2B4C] border border-[#E76F00] flex items-center justify-center text-[#E76F00] flex-shrink-0 shadow-lg">
                      {React.createElement(
                        getDynamicIcon(
                          editItem.icon_name,
                          modalType === "services" ? Wrench : modalType === "industries" ? Factory : Briefcase
                        ),
                        { className: "w-6 h-6" }
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={editItem.icon_name || ""}
                        onChange={(e) => setEditItem({ ...editItem, icon_name: e.target.value })}
                        placeholder="e.g. Cpu, Zap, Sliders, Users, Briefcase, Award, ShieldCheck..."
                        className="w-full bg-[#050E1A] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#E76F00]"
                      />
                    </div>
                  </div>

                  {/* Quick Select Icon Grid */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] text-slate-400 font-medium mb-2">Available Industrial Icons:</div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-h-40 overflow-y-auto pr-1">
                      {Object.entries(AVAILABLE_ICONS).map(([name, IconComponent]) => {
                        const isSelected = editItem.icon_name === name;
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => setEditItem({ ...editItem, icon_name: name })}
                            title={name}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#E76F00]/25 border-[#E76F00] text-[#E76F00] ring-1 ring-[#E76F00] shadow-md shadow-[#E76F00]/20"
                                : "bg-[#050E1A] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span className="text-[9px] truncate max-w-full mt-1 font-mono">{name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Bullets List Editor for Services */}
              {modalType === "services" && (
                <div className="p-4 bg-[#081524] border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      Core Capabilities & Bullet Points
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {(editItem.bullets || []).length} items
                    </span>
                  </div>

                  <div className="space-y-2">
                    {(editItem.bullets || []).map((bullet: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E76F00] flex-shrink-0" />
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const newBullets = [...(editItem.bullets || [])];
                            newBullets[idx] = e.target.value;
                            setEditItem({ ...editItem, bullets: newBullets });
                          }}
                          className="flex-1 bg-[#050E1A] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E76F00]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newBullets = (editItem.bullets || []).filter((_: any, i: number) => i !== idx);
                            setEditItem({ ...editItem, bullets: newBullets });
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditItem({
                        ...editItem,
                        bullets: [...(editItem.bullets || []), "New capability item"],
                      });
                    }}
                    className="text-xs text-[#E76F00] hover:text-[#d46500] font-semibold flex items-center gap-1 mt-2 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Capability Bullet
                  </button>
                </div>
              )}

              {modalType === "clients" && (
                <div className="space-y-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Client Role / Relationship</label>
                    <input
                      type="text"
                      value={editItem.role || ""}
                      onChange={(e) => setEditItem({ ...editItem, role: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>

                  {/* Client Logo Manager */}
                  <div className="p-4 bg-[#081524] border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Client Partner Logo Image
                      </label>
                      {editItem.logo_url && (
                        <button
                          type="button"
                          onClick={() => setEditItem({ ...editItem, logo_url: "" })}
                          className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove Logo
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-white p-2 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow">
                        {editItem.logo_url ? (
                          <img
                            src={editItem.logo_url}
                            alt="Logo preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono">No Logo</span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadMediaFile(file, "logo_url");
                          }}
                          className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#E76F00] file:text-white"
                        />
                        <input
                          type="text"
                          value={editItem.logo_url || ""}
                          onChange={(e) => setEditItem({ ...editItem, logo_url: e.target.value })}
                          placeholder="or enter logo URL /image path"
                          className="w-full bg-[#050E1A] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Client Site Image Manager */}
                  <div className="p-4 bg-[#081524] border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Site Execution / Card Photo
                      </label>
                      {editItem.image_url && (
                        <button
                          type="button"
                          onClick={() => setEditItem({ ...editItem, image_url: "" })}
                          className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove Photo
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center flex-shrink-0 shadow">
                        {editItem.image_url ? (
                          <img
                            src={editItem.image_url}
                            alt="Site preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">No Image</span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadMediaFile(file, "image_url");
                          }}
                          className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#E76F00] file:text-white"
                        />
                        <input
                          type="text"
                          value={editItem.image_url || ""}
                          onChange={(e) => setEditItem({ ...editItem, image_url: e.target.value })}
                          placeholder="or enter image URL /image path"
                          className="w-full bg-[#050E1A] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Industries Image Manager */}
              {modalType === "industries" && (
                <div className="p-4 bg-[#081524] border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      Industry Header / Card Image
                    </label>
                    {editItem.image_url && (
                      <button
                        type="button"
                        onClick={() => setEditItem({ ...editItem, image_url: "" })}
                        className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Image
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center flex-shrink-0 shadow">
                      {editItem.image_url ? (
                        <img
                          src={editItem.image_url}
                          alt="Industry preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">No Image</span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadMediaFile(file, "image_url");
                        }}
                        className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#E76F00] file:text-white"
                      />
                      <input
                        type="text"
                        value={editItem.image_url || ""}
                        onChange={(e) => setEditItem({ ...editItem, image_url: e.target.value })}
                        placeholder="or enter image URL /industries/..."
                        className="w-full bg-[#050E1A] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Extra Fields */}
              {modalType === "projects" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Client</label>
                    <input
                      type="text"
                      value={editItem.client || ""}
                      onChange={(e) => setEditItem({ ...editItem, client: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Location</label>
                    <input
                      type="text"
                      value={editItem.location || ""}
                      onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Industry Sector</label>
                    <input
                      type="text"
                      value={editItem.industry || ""}
                      onChange={(e) => setEditItem({ ...editItem, industry: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Execution Status</label>
                    <select
                      value={editItem.status || "Completed"}
                      onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Infrastructure Extra Fields */}
              {modalType === "infrastructure" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Manufacturer</label>
                    <input
                      type="text"
                      value={editItem.manufacturer || ""}
                      onChange={(e) => setEditItem({ ...editItem, manufacturer: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Model Number</label>
                    <input
                      type="text"
                      value={editItem.model || ""}
                      onChange={(e) => setEditItem({ ...editItem, model: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Quantity</label>
                    <input
                      type="text"
                      value={editItem.qty || ""}
                      onChange={(e) => setEditItem({ ...editItem, qty: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Calibration Status</label>
                    <input
                      type="text"
                      value={editItem.calibration_status || ""}
                      onChange={(e) => setEditItem({ ...editItem, calibration_status: e.target.value })}
                      className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                    />
                  </div>
                </div>
              )}

              {/* Careers Extra Fields */}
              {modalType === "careers" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Department</label>
                      <input
                        type="text"
                        value={editItem.department || ""}
                        onChange={(e) => setEditItem({ ...editItem, department: e.target.value })}
                        placeholder="e.g. Control & Instrumentation"
                        className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Experience Required</label>
                      <input
                        type="text"
                        value={editItem.experience || ""}
                        onChange={(e) => setEditItem({ ...editItem, experience: e.target.value })}
                        placeholder="e.g. 2 - 8 Years"
                        className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Role Value (Pre-filled Form Name)</label>
                      <input
                        type="text"
                        value={editItem.role_value || ""}
                        onChange={(e) => setEditItem({ ...editItem, role_value: e.target.value })}
                        placeholder="e.g. Instrumentation Engineer"
                        className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Work Location / Deployment</label>
                      <input
                        type="text"
                        value={editItem.location || ""}
                        onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                        placeholder="e.g. PAN India Project Sites"
                        className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* RICH VISUAL & HTML EDITOR FOR DESCRIPTION / SCOPE */}
              <div className="space-y-1.5 pt-2">
                <RichEditor
                  label="Detailed Scope / Description / HTML Content"
                  value={
                    editItem.short_desc ||
                    editItem.description ||
                    editItem.scope ||
                    editItem.use_case ||
                    ""
                  }
                  onChange={(val) =>
                    setEditItem({
                      ...editItem,
                      short_desc: val,
                      description: val,
                      scope: val,
                      use_case: val,
                    })
                  }
                  minHeight="180px"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#081524] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalType(null);
                  setEditItem(null);
                }}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 text-xs font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveItem}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? "Saving..." : "Save to Database"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= INQUIRY / RFQ / CAREER FULL DETAILS MODAL ================= */}
      {selectedInquiry && (() => {
        const isCareer = (selectedInquiry.type || "").toLowerCase() === "career";
        const code = selectedInquiry.inquiry_code || (isCareer ? `APP-${selectedInquiry.id}` : `RFQ-${selectedInquiry.id}`);

        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0D1829] border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 animate-fadeIn">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#081524]">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${
                      isCareer
                        ? "text-sky-400 bg-sky-500/10 border-sky-500/20"
                        : "text-[#E76F00] bg-[#E76F00]/10 border-[#E76F00]/20"
                    }`}
                  >
                    {code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {isCareer ? (
                        <>
                          <UserCheck className="w-4 h-4 text-sky-400" />
                          <span>Candidate Application Dossier</span>
                        </>
                      ) : (
                        <>
                          <Inbox className="w-4 h-4 text-[#E76F00]" />
                          <span>RFQ & Project Lead Dossier</span>
                        </>
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Received on {selectedInquiry.created_at || "Recent"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
                {/* Quick Status Bar */}
                <div className="bg-[#081524] p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-slate-400 font-semibold text-[11px]">
                    Pipeline Status:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(isCareer
                      ? [
                          { id: "New", label: "🟢 New", activeClass: "bg-sky-600 text-white" },
                          { id: "Under Review", label: "🟡 Under Review", activeClass: "bg-amber-600 text-white" },
                          { id: "Shortlisted", label: "🔵 Shortlisted", activeClass: "bg-blue-600 text-white" },
                          { id: "Interview Scheduled", label: "🟣 Interview", activeClass: "bg-purple-600 text-white" },
                          { id: "Hired", label: "🏆 Hired", activeClass: "bg-emerald-600 text-white" },
                          { id: "Rejected", label: "⚪ Rejected", activeClass: "bg-slate-600 text-white" },
                        ]
                      : [
                          { id: "New", label: "🟢 New", activeClass: "bg-emerald-600 text-white" },
                          { id: "In Review", label: "🟡 In Review", activeClass: "bg-amber-600 text-white" },
                          { id: "Quoted", label: "🔵 Quoted", activeClass: "bg-blue-600 text-white" },
                          { id: "Closed", label: "⚪ Closed", activeClass: "bg-slate-600 text-white" },
                        ]
                    ).map((st) => {
                      const isCur =
                        (selectedInquiry.status || "New").toLowerCase() === st.id.toLowerCase();
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, st.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                            isCur
                              ? st.activeClass + " shadow-sm"
                              : "bg-slate-800/80 text-slate-400 hover:text-white"
                          }`}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CAREER CANDIDATE PROFILE OR CLIENT PROFILE */}
                {isCareer ? (
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                      <span>Candidate Profile & Qualifications</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-[#081524] p-4 rounded-xl border border-slate-800">
                      {/* Candidate Name */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Candidate Name</span>
                        <div className="flex items-center gap-2 mt-1 min-w-0">
                          <span className="font-bold text-white text-sm truncate">
                            {selectedInquiry.client_name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedInquiry.client_name, "Candidate Name")}
                            className="text-slate-500 hover:text-slate-300 shrink-0"
                            title="Copy Name"
                          >
                            {copiedField === "Candidate Name" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Applied Role */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Applied Position</span>
                        <div className="mt-1">
                          <span className="inline-block font-semibold text-xs text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 truncate max-w-full">
                            {selectedInquiry.designation || selectedInquiry.product_interest || "Job Applicant"}
                          </span>
                        </div>
                      </div>

                      {/* Total Experience */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Total Experience</span>
                        <span className="font-semibold text-emerald-400 text-sm mt-1 block">
                          {selectedInquiry.experience || selectedInquiry.quantity || "N/A"}
                        </span>
                      </div>

                      {/* Current Location */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Current Location</span>
                        <span className="font-semibold text-slate-200 text-xs mt-1 block truncate">
                          {selectedInquiry.location || selectedInquiry.company || "N/A"}
                        </span>
                      </div>

                      {/* Preferred Location */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Preferred Location</span>
                        <span className="font-semibold text-slate-200 text-xs mt-1 block truncate">
                          {selectedInquiry.application || "Any / Pan-India"}
                        </span>
                      </div>

                      {/* Notice Period */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Notice Period</span>
                        <span className="font-semibold text-amber-300 text-xs mt-1 block">
                          {selectedInquiry.notice_period || "Immediate / Not Specified"}
                        </span>
                      </div>

                      {/* Email Address */}
                      <div className="min-w-0 sm:col-span-2 lg:col-span-2">
                        <span className="text-slate-400 block text-[11px]">Candidate Email</span>
                        <div className="flex items-center gap-2 mt-1 min-w-0 bg-[#050E1A] px-2.5 py-1.5 rounded-lg border border-slate-800">
                          <a
                            href={`mailto:${selectedInquiry.email}`}
                            className="text-sky-400 hover:underline font-mono text-xs truncate break-all flex-1 min-w-0"
                            title={selectedInquiry.email}
                          >
                            {selectedInquiry.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedInquiry.email, "Candidate Email")}
                            className="text-slate-500 hover:text-slate-300 shrink-0 p-0.5"
                            title="Copy Email"
                          >
                            {copiedField === "Candidate Email" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Candidate Phone</span>
                        <div className="flex items-center gap-2 mt-1 min-w-0 bg-[#050E1A] px-2.5 py-1.5 rounded-lg border border-slate-800">
                          <a
                            href={`tel:${selectedInquiry.phone}`}
                            className="text-slate-200 hover:text-white font-mono text-xs font-semibold flex-1 min-w-0"
                          >
                            {selectedInquiry.phone}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedInquiry.phone, "Candidate Phone")}
                            className="text-slate-500 hover:text-slate-300 shrink-0 p-0.5"
                            title="Copy Phone"
                          >
                            {copiedField === "Candidate Phone" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#E76F00]" />
                      <span>Client & Organization Profile</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-[#081524] p-4 rounded-xl border border-slate-800">
                      {/* Contact Person */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Contact Person</span>
                        <div className="flex items-center gap-2 mt-1 min-w-0">
                          <span className="font-bold text-white text-sm truncate">
                            {selectedInquiry.client_name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedInquiry.client_name, "Name")}
                            className="text-slate-500 hover:text-slate-300 shrink-0"
                            title="Copy Name"
                          >
                            {copiedField === "Name" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Designation / Role */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Designation / Role</span>
                        <div className="mt-1">
                          {selectedInquiry.designation ? (
                            <span className="inline-block font-semibold text-xs text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 truncate max-w-full">
                              {selectedInquiry.designation}
                            </span>
                          ) : (
                            <span className="text-slate-500 text-xs italic">Not Specified</span>
                          )}
                        </div>
                      </div>

                      {/* Company / Organization */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Company / Organization</span>
                        <span className="font-semibold text-slate-200 text-sm mt-1 block truncate">
                          {selectedInquiry.company || "Individual / Not Specified"}
                        </span>
                      </div>

                      {/* Email Address */}
                      <div className="min-w-0 sm:col-span-2 lg:col-span-2">
                        <span className="text-slate-400 block text-[11px]">Email Address</span>
                        <div className="flex items-center gap-2 mt-1 min-w-0 bg-[#050E1A] px-2.5 py-1.5 rounded-lg border border-slate-800">
                          <a
                            href={`mailto:${selectedInquiry.email}`}
                            className="text-[#E76F00] hover:underline font-mono text-xs truncate break-all flex-1 min-w-0"
                            title={selectedInquiry.email}
                          >
                            {selectedInquiry.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedInquiry.email, "Email")}
                            className="text-slate-500 hover:text-slate-300 shrink-0 p-0.5"
                            title="Copy Email"
                          >
                            {copiedField === "Email" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px]">Phone / Mobile Number</span>
                        <div className="flex items-center gap-2 mt-1 min-w-0 bg-[#050E1A] px-2.5 py-1.5 rounded-lg border border-slate-800">
                          <a
                            href={`tel:${selectedInquiry.phone}`}
                            className="text-slate-200 hover:text-white font-mono text-xs font-semibold flex-1 min-w-0"
                          >
                            {selectedInquiry.phone}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedInquiry.phone, "Phone")}
                            className="text-slate-500 hover:text-slate-300 shrink-0 p-0.5"
                            title="Copy Phone"
                          >
                            {copiedField === "Phone" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* RFQ PROJECT SCOPE (ONLY FOR CONTACT INQUIRIES) */}
                {!isCareer && (
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#E76F00]" />
                      <span>Project Scope & Schedule Parameters</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#081524] p-4 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Service Requested</span>
                        <span className="font-semibold text-white mt-0.5 block">
                          {selectedInquiry.product_interest || "General Inquiry"}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Site Location</span>
                        <span className="font-semibold text-slate-200 mt-0.5 block">
                          {selectedInquiry.location || selectedInquiry.quantity || "N/A"}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Industry Sector</span>
                        <span className="text-slate-200 mt-0.5 block">
                          {selectedInquiry.application || "Standard Industrial"}
                        </span>
                      </div>

                      {selectedInquiry.project_status && (
                        <div>
                          <span className="text-slate-400 block text-[11px]">Project Status</span>
                          <span className="font-semibold text-emerald-400 mt-0.5 block">
                            {selectedInquiry.project_status}
                          </span>
                        </div>
                      )}

                      {selectedInquiry.start_date && (
                        <div>
                          <span className="text-slate-400 block text-[11px]">Target Start Date</span>
                          <span className="font-semibold text-sky-400 mt-0.5 block font-mono">
                            {selectedInquiry.start_date}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message / Bio Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <FileText className={`w-3.5 h-3.5 ${isCareer ? "text-sky-400" : "text-[#E76F00]"}`} />
                      <span>{isCareer ? "Candidate Bio / Cover Note" : "Technical Requirement / Message"}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopyText(selectedInquiry.message || "", "Message")}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedField === "Message" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-[#050E1A] p-4 rounded-xl border border-slate-800 text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.message || (isCareer ? "No candidate bio provided." : "No requirement message provided.")}
                  </div>
                </div>

                {/* Attached Document / Resume Section */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Paperclip className={`w-3.5 h-3.5 ${isCareer ? "text-sky-400" : "text-[#E76F00]"}`} />
                    <span>{isCareer ? "Attached Candidate Resume / CV" : "Attached Specification / BoQ / Drawing"}</span>
                  </h4>

                  {selectedInquiry.attachment_url ? (
                    <div
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#081524] ${
                        isCareer ? "border-sky-500/30" : "border-emerald-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-3 rounded-xl border shrink-0 ${
                            isCareer
                              ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <span className="text-white font-semibold text-xs block truncate">
                            {selectedInquiry.attachment_name || (isCareer ? "Candidate Resume / CV" : "Specification Document")}
                          </span>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                            {selectedInquiry.attachment_size && (
                              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                                {selectedInquiry.attachment_size}
                              </span>
                            )}
                            <span className="truncate text-slate-500 max-w-[200px] sm:max-w-xs">
                              {selectedInquiry.attachment_url}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <a
                          href={selectedInquiry.attachment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                            isCareer
                              ? "bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 hover:text-white border-sky-500/30"
                              : "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300 border-emerald-500/30"
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View / Open</span>
                        </a>

                        <a
                          href={selectedInquiry.attachment_url}
                          download={selectedInquiry.attachment_name || true}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyText(selectedInquiry.attachment_url, "Attachment Link")}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg text-xs"
                          title="Copy Attachment URL"
                        >
                          {copiedField === "Attachment Link" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#081524]/60 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-500 italic flex items-center gap-2">
                      <Paperclip className="w-3.5 h-3.5 text-slate-600" />
                      <span>{isCareer ? "No resume file was attached with this application." : "No document was uploaded with this RFQ inquiry."}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 border-t border-slate-800 bg-[#081524] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const summary = isCareer
                      ? `Candidate Application: ${code}\nName: ${selectedInquiry.client_name}\nApplied Role: ${selectedInquiry.designation || selectedInquiry.product_interest}\nExperience: ${selectedInquiry.experience || selectedInquiry.quantity}\nLocation: ${selectedInquiry.location || selectedInquiry.company}\nPreferred: ${selectedInquiry.application}\nNotice: ${selectedInquiry.notice_period}\nEmail: ${selectedInquiry.email}\nPhone: ${selectedInquiry.phone}\nBio: ${selectedInquiry.message}\nResume: ${selectedInquiry.attachment_url || 'N/A'}`
                      : `Lead Details: ${code}\nClient: ${selectedInquiry.client_name} (${selectedInquiry.company || 'N/A'})\nDesignation: ${selectedInquiry.designation || 'N/A'}\nEmail: ${selectedInquiry.email}\nPhone: ${selectedInquiry.phone}\nService: ${selectedInquiry.product_interest}\nSite Location: ${selectedInquiry.location || selectedInquiry.quantity || 'N/A'}\nIndustry: ${selectedInquiry.application}\nStatus: ${selectedInquiry.project_status || 'N/A'}\nStart Date: ${selectedInquiry.start_date || 'N/A'}\nMessage: ${selectedInquiry.message}\nAttachment: ${selectedInquiry.attachment_url || 'N/A'}`;
                    handleCopyText(summary, "Full Summary");
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=RE:%20${encodeURIComponent(
                      code
                    )}%20-%20Krishna%20Instrumentation%20Works`}
                    className={`px-3.5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm ${
                      isCareer ? "bg-sky-600 hover:bg-sky-500" : "bg-[#E76F00] hover:bg-[#d46500]"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>

                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-rose-500/20 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ================= CHANGE PASSWORD MODAL DIALOG ================= */}
      {changePwModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D1829] border border-slate-700/80 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden my-8 animate-fadeIn">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#081524]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#E76F00]/10 border border-[#E76F00]/30 text-[#E76F00]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Change Admin Password</h3>
                  <p className="text-[11px] text-slate-400">Update your account login credentials</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setChangePwModal(false);
                  setPwChangeMessage(null);
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleChangePassword} className="p-6 space-y-4 text-xs">
              {pwChangeMessage && (
                <div
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs animate-fadeIn ${
                    pwChangeMessage.isError
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  }`}
                >
                  <span>{pwChangeMessage.isError ? "✕" : "✓"}</span>
                  <span>{pwChangeMessage.text}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 pr-8 text-white focus:outline-none focus:border-[#E76F00] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="text-slate-500 hover:text-slate-300 absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showCurrentPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">New Password (Min 6 chars)</label>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 pr-8 text-white focus:outline-none focus:border-[#E76F00] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="text-slate-500 hover:text-slate-300 absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showNewPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPw}
                  onChange={(e) => setConfirmNewPw(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full bg-[#050E1A] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#E76F00] font-mono"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setChangePwModal(false);
                    setPwChangeMessage(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isChangingPw}
                  className="px-4 py-2 rounded-xl bg-[#E76F00] hover:bg-[#d46500] text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 shadow-sm"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{isChangingPw ? "Saving..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
