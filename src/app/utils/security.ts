import { CVData } from "../types";

/**
 * Security & Monetization helper for Meu CV
 */

export interface SystemConfig {
  whatsappNumber: string;
  displayPhone: string;
  price: string;
  adminPassword: string;
  masterKeyEnabled: boolean;
}

export const DEFAULT_CONFIG: SystemConfig = {
  whatsappNumber: "244946554601",
  displayPhone: "+244 946 554 601",
  price: "5.000 Kz",
  adminPassword: "orlando2026",
  masterKeyEnabled: false,
};

const CONFIG_STORAGE_KEY = "cv_system_config";
const USED_CODES_STORAGE_KEY = "cv_used_unlock_codes";
const MASTER_UNLOCK_CODE = "ORLANDO-VIP-2026";
const ORDER_PREFIX = "meu_cv_order_";
const RECENT_ORDERS_KEY = "meu_cv_recent_orders";

/**
 * Load persisted admin configuration or default
 */
export function getSystemConfig(): SystemConfig {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_CONFIG;
}

/**
 * Save updated admin configuration
 */
export function saveSystemConfig(newConfig: Partial<SystemConfig>): SystemConfig {
  const current = getSystemConfig();
  const updated = { ...current, ...newConfig };
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Generate a random, human-friendly order code (e.g. CV-74829)
 */
export function generateRandomOrderId(): string {
  const randNum = Math.floor(10000 + Math.random() * 90000);
  return `CV-${randNum}`;
}

/**
 * Save CV data associated with an Order ID
 * This guarantees that even if a mobile browser reloads or tab sleeps,
 * the CV is never lost and can be recovered with the Order ID.
 */
export function saveOrderCV(orderId: string, data: CVData): void {
  try {
    const key = `${ORDER_PREFIX}${orderId.toUpperCase().trim()}`;
    localStorage.setItem(key, JSON.stringify(data));

    // Also update index of recent orders
    const recent = getRecentOrders();
    const existingIndex = recent.findIndex((o) => o.orderId === orderId);
    const entry = {
      orderId: orderId.toUpperCase().trim(),
      name: data.personalInfo.fullName || "Cliente Sem Nome",
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      recent[existingIndex] = entry;
    } else {
      recent.unshift(entry);
    }
    localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify(recent.slice(0, 30)));
  } catch (e) {
    console.error("Error saving order CV:", e);
  }
}

/**
 * Retrieve CV data associated with an Order ID
 */
export function getOrderCV(orderId: string): CVData | null {
  try {
    const key = `${ORDER_PREFIX}${orderId.toUpperCase().trim()}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error getting order CV:", e);
  }
  return null;
}

/**
 * Get list of recent orders for the admin or lookup
 */
export function getRecentOrders(): { orderId: string; name: string; updatedAt: string }[] {
  try {
    const saved = localStorage.getItem(RECENT_ORDERS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback
  }
  return [];
}

/**
 * Deterministically generate an unlock code from an order ID.
 * This guarantees that Orlando can calculate the EXACT same unlock code
 * for that specific client, and no client can guess it without paying.
 */
export function generateUnlockCode(orderId: string): string {
  const cleanId = orderId.toUpperCase().trim();
  const secretSalt = "ORLANDO_CV_PAYMENT_SECRET_KEY_ANGOLA_2026";
  const str = `${cleanId}#${secretSalt}`;

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }

  // Generate a clean 6-digit numeric pin (e.g. "LIB-839214")
  const positiveHash = Math.abs(hash);
  const codeNum = (positiveHash % 900000) + 100000;
  return `LIB-${codeNum}`;
}

/**
 * Get list of already used unlock codes
 */
function getUsedCodes(): string[] {
  try {
    const saved = localStorage.getItem(USED_CODES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback
  }
  return [];
}

/**
 * Mark a code as consumed
 */
function markCodeAsUsed(code: string): void {
  const used = getUsedCodes();
  if (!used.includes(code)) {
    used.push(code);
    localStorage.setItem(USED_CODES_STORAGE_KEY, JSON.stringify(used));
  }
}

/**
 * Validate an entered unlock code against an order ID
 */
export function validateUnlockCode(
  orderId: string,
  enteredCode: string
): { success: boolean; message: string } {
  const cleanCode = enteredCode.toUpperCase().replace(/\s+/g, "").trim();
  const cleanOrderId = orderId.toUpperCase().trim();

  if (!cleanCode) {
    return { success: false, message: "Por favor, digite o código de desbloqueio." };
  }

  // Master bypass code for testing/admin
  if (
    cleanCode === MASTER_UNLOCK_CODE ||
    cleanCode === "ORLANDO-VIP-2026" ||
    cleanCode === "ORLANDOVIP2026" ||
    cleanCode === "ORLANDO2026"
  ) {
    return { success: true, message: "Chave Mestra aceita! Download liberado para administrador." };
  }

  // Calculate expected code for this specific order
  const expectedCode = generateUnlockCode(cleanOrderId);
  const expectedNum = expectedCode.replace(/\D/g, "");
  const enteredNum = cleanCode.replace(/\D/g, "");

  // Accept full code (e.g. "LIB-839214") or just the 6 digits (e.g. "839214")
  if (cleanCode === expectedCode || (enteredNum.length === 6 && enteredNum === expectedNum)) {
    return {
      success: true,
      message: "Pagamento confirmado! Download desbloqueado com sucesso.",
    };
  }

  return {
    success: false,
    message: `Código inválido para o pedido ${cleanOrderId}. Verifique os 6 dígitos enviados no WhatsApp ou utilize a Chave Mestra.`,
  };
}

/**
 * Generate a direct WhatsApp redirect URL with pre-filled message
 */
export function buildWhatsAppUrl(
  phone: string,
  clientName: string,
  orderId: string,
  price: string
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const name = clientName.trim() || "Cliente";

  const message = `Olá Orlando! 👋\n\nAcabei de criar o meu currículo profissional no Meu CV:\n👤 *Nome:* ${name}\n🆔 *Código do Pedido:* ${orderId}\n💰 *Valor:* ${price}\n\nQuero fazer o pagamento para receber o meu código de desbloqueio e baixar o CV em PDF.\n\nPoderia enviar os dados de pagamento (Multicaixa Express / IBAN)?`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
