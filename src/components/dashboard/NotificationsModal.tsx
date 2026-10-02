import React from "react";
import { SchoolNotification, UserRole } from "../../types";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Bell,
  CheckCheck,
  Calendar,
  Award,
  AlertTriangle,
  UserCheck,
  CreditCard,
} from "lucide-react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SchoolNotification[];
  onMarkAllAsRead: () => void;
  onMarkSingleAsRead: (id: string) => void;
  currentRole: UserRole;
}

export function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkSingleAsRead,
  currentRole,
}: NotificationsModalProps) {
  // Filter notifications relevant to current role or all
  const filtered = notifications.filter(
    (n) => n.roleTarget === currentRole || n.roleTarget === undefined
  );

  const getIcon = (type: SchoolNotification["type"]) => {
    switch (type) {
      case "izin":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "kehadiran":
        return <UserCheck className="w-4 h-4 text-emerald-500" />;
      case "nilai":
        return <Award className="w-4 h-4 text-blue-500" />;
      case "keuangan":
        return <CreditCard className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pusat Notifikasi & Aktivitas"
      description="Pemberitahuan resmi sistem akademik, kehadiran, perizinan, dan laporan masuk."
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Actions Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500">
            Menampilkan {filtered.length} pemberitahuan terbaru
          </span>
          {filtered.some((n) => !n.read) && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="w-3.5 h-3.5 mr-1" />
              Tandai Semua Terbaca
            </Button>
          )}
        </div>

        {/* Notification List */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              Tidak ada notifikasi baru saat ini.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onMarkSingleAsRead(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  item.read
                    ? "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    : "bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-slate-900 dark:text-slate-100 shadow-xs"
                }`}
              >
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs mt-0.5 shrink-0">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-xs sm:text-sm truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
