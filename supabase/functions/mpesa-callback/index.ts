import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const callbackData = await req.json();
    console.log('M-Pesa callback received:', JSON.stringify(callbackData, null, 2));

    const { Body } = callbackData;
    
    if (!Body || !Body.stkCallback) {
      throw new Error('Invalid callback data structure');
    }

    const { stkCallback } = Body;
    const { ResultCode, ResultDesc, CheckoutRequestID, MerchantRequestID, CallbackMetadata } = stkCallback;

    // Store transaction details
    const transactionData: any = {
      checkout_request_id: CheckoutRequestID,
      merchant_request_id: MerchantRequestID,
      result_code: ResultCode,
      result_desc: ResultDesc,
      callback_received_at: new Date().toISOString(),
    };

    // If payment was successful, extract metadata
    if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
      const items = CallbackMetadata.Item;
      transactionData.amount = items.find((item: any) => item.Name === 'Amount')?.Value;
      transactionData.mpesa_receipt_number = items.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      transactionData.transaction_date = items.find((item: any) => item.Name === 'TransactionDate')?.Value;
      transactionData.phone_number = items.find((item: any) => item.Name === 'PhoneNumber')?.Value;
    }

    // Log the callback (you might want to store this in a database table)
    console.log('Transaction processed:', transactionData);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error processing M-Pesa callback:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
