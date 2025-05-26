export interface IMemberForm {
  email: string;           // 電子郵件，當作帳號用
  password: string;
  displayName?: string;    // 暱稱（可選填）
  phone?: string;          // 電話（可選填）
  memberLevel: string[];   // 會員等級，陣列
}
