// Mock API service — no real network calls
// Replace with real fetch calls when backend is ready

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateComplaintId() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `IDP-${date}-${code}`;
}

export async function getCountries() {
  // Not used directly anymore (useCountries uses local data)
  // but kept for future backend integration
  await delay(100);
  return [];
}

export async function uploadFile(file) {
  // Simulate upload with a short delay
  await delay(800);
  return {
    fileId: `f_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    fileName: file.name,
    size: file.size,
    mimeType: file.type,
    scanStatus: 'clean',
  };
}

export async function deleteFile(fileId) {
  await delay(300);
  return { success: true };
}

export async function submitComplaint(data) {
  // Simulate submission with a realistic delay
  await delay(1500);
  return {
    complaintId: generateComplaintId(),
    status: 'received',
    emailSent: data.contactPreference === 'yes',
  };
}
