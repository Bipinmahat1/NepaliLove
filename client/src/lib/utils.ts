import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);
  const diffInMs = now.getTime() - target.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return target.toLocaleDateString();
  }
}

export function getAgeFromBirthdate(birthdate: Date | string): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function validateNepalPhoneNumber(phone: string): boolean {
  // Nepal phone number pattern: +977-XXXXXXXXX or 98XXXXXXXX
  const nepalPhoneRegex = /^(\+977|977)?[- ]?[98]\d{8}$/;
  return nepalPhoneRegex.test(phone.replace(/\s+/g, ''));
}

export function formatNepalPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format as +977 98XX-XXXXXX
  if (digits.length === 10 && digits.startsWith('9')) {
    return `+977 ${digits.slice(0, 4)}-${digits.slice(4)}`;
  } else if (digits.length === 13 && digits.startsWith('977')) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  
  return phone;
}
