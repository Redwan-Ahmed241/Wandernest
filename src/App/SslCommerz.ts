// SSLCommerz Configuration and API Integration

export interface SSLCommerzConfig {
  store_id: string
  store_passwd: string
  is_live: boolean // false for sandbox, true for live
}

export interface SSLCommerzInitData {
  total_amount: number
  currency: string
  tran_id: string
  success_url: string
  fail_url: string
  cancel_url: string
  ipn_url: string
  cus_name: string
  cus_email: string
  cus_add1: string
  cus_city: string
  cus_country: string
  cus_phone: string
  product_name: string
  product_category: string
  product_profile: string
  shipping_method?: string
  num_of_item?: number
  ship_name?: string
  ship_add1?: string
  ship_city?: string
  ship_country?: string
}

export interface SSLCommerzResponse {
  status: string
  failedreason?: string
  sessionkey?: string
  gw?: {
    gateway: string
    logo: string
    desc: string
    is_direct_api: boolean
    redirect_url: string
  }[]
  redirectGatewayURL?: string
  directPaymentURLBank?: string
  directPaymentURLCard?: string
  directPaymentURL?: string
  redirectGatewayURLFailed?: string
  GatewayPageURL?: string
}

export interface SSLCommerzValidationResponse {
  status: string
  tran_date: string
  tran_id: string
  val_id: string
  amount: string
  currency: string
  store_amount: string
  bank_tran_id: string
  card_type: string
  card_no: string
  card_issuer: string
  card_brand: string
  card_issuer_country: string
  card_issuer_country_code: string
  currency_type: string
  currency_amount: string
  currency_rate: string
  base_fair: string
  value_a: string
  value_b: string
  value_c: string
  value_d: string
  risk_level: string
  risk_title: string
}

class SSLCommerzService {
  private config: SSLCommerzConfig
  private baseUrl: string

  constructor(config: SSLCommerzConfig) {
    this.config = config
    this.baseUrl = config.is_live ? "https://securepay.sslcommerz.com" : "https://sandbox.sslcommerz.com"
  }

  // Initialize payment session
  async initPayment(data: SSLCommerzInitData): Promise<SSLCommerzResponse> {
    const payload = {
      store_id: this.config.store_id,
      store_passwd: this.config.store_passwd,
      ...data,
    }

    const response = await fetch(`${this.baseUrl}/gwprocess/v4/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload as any).toString(),
    })

    if (!response.ok) {
      throw new Error(`SSLCommerz API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Validate payment after success
  async validatePayment(val_id: string): Promise<SSLCommerzValidationResponse> {
    const payload = {
      store_id: this.config.store_id,
      store_passwd: this.config.store_passwd,
      val_id: val_id,
      format: "json",
    }

    const response = await fetch(`${this.baseUrl}/validator/api/validationserverAPI.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload).toString(),
    })

    if (!response.ok) {
      throw new Error(`SSLCommerz validation error: ${response.statusText}`)
    }

    return response.json()
  }

  // Generate unique transaction ID
  generateTransactionId(bookingId: string): string {
    const timestamp = Date.now()
    return `WN_${bookingId}_${timestamp}`
  }
}

// Export singleton instance
export const sslcommerzService = new SSLCommerzService({
  store_id: process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID || "testbox",
  store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty",
  is_live: process.env.NODE_ENV === "production",
})
