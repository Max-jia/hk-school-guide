// 浏览器端的解锁凭证读取（客户端安全，不含任何服务端密钥）
//
// 注意：localStorage 里只有「签名 license」算数。
// 旧版把 "all_access"/"purchased_<slug>" 设成字符串 "true" 就算解锁，
// 等于在控制台打一行就能白嫖全站——那两个标记现在只作历史兼容读取，
// 真正的闸门在 /api/report-content（服务端验签）。

const LICENSE_ALL = "license_all";
const LICENSE_PREFIX = "license_";

export function readStoredLicense(slug: string): string | null {
  try {
    return (
      localStorage.getItem(LICENSE_PREFIX + slug) ||
      localStorage.getItem(LICENSE_ALL) ||
      null
    );
  } catch {
    return null;
  }
}

/** 是否已解鎖（以存在簽名憑證為準） */
export function hasStoredUnlock(slug: string): boolean {
  return readStoredLicense(slug) !== null;
}
