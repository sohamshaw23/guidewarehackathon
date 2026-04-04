const API_BASE_URL = '';

class ApiClient {
  private token: string | null = null;

  constructor() {
    // For demo purposes, we might want to auto-login or store token in localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('gs_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('gs_token', token);
    }
  }

  async fetch(endpoint: string, options: RequestInit = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API Error');
    }

    return response.json();
  }

  // Auth
  async login(phone: string, password: string) {
    const data = await this.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async getProfile() {
    return this.fetch('/auth/profile');
  }

  // Policies
  async getPlans() {
    return this.fetch('/policy/plans');
  }

  async getPolicyStatus() {
    return this.fetch('/policy/status');
  }

  async activatePolicy(planId: number) {
    return this.fetch('/policy/activate', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
    });
  }

  // Activity
  async updateActivity(lat: number, lng: number, orders: number) {
    return this.fetch('/activity/update', {
      method: 'POST',
      body: JSON.stringify({ lat, lng, orders_completed: orders }),
    });
  }

  // Payouts
  async getPayoutHistory() {
    return this.fetch('/payout/history');
  }
}

export const api = new ApiClient();
