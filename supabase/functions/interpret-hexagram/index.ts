import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 调用缘份居占卜 API
    const API_KEY = "6tR4JHkx4OhLjm8lZjC9tY8Kh";
    const API_URL = "https://api.yuanfenju.com/index.php/v1/Zhanbu/yaogua";
    
    // 构建 x-www-form-urlencoded 格式的请求体
    const formData = new URLSearchParams();
    formData.append("api_key", API_KEY);
    formData.append("lang", "zh-cn");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("缘份居 API 错误:", response.status, errorText);
      throw new Error("占卜服务调用失败");
    }

    const apiData = await response.json();

    // 检查 API 返回状态
    if (apiData.errcode !== 0) {
      console.error("缘份居 API 返回错误:", apiData.errmsg);
      throw new Error(apiData.errmsg || "占卜服务异常");
    }

    // 提取数据并映射为前端需要的格式
    const data = apiData.data;
    
    // 验证卦象 ID 范围
    if (!data.id || data.id < 1 || data.id > 64) {
      throw new Error("卦象数据异常");
    }

    // 返回映射后的数据
    const interpretation = {
      id: data.id,
      common_desc1: data.common_desc1,
      common_desc2: data.common_desc2,
      common_desc3: data.common_desc3,
      shiye: data.shiye,
      jingshang: data.jingshang,
      qiuming: data.qiuming,
      waichu: data.waichu,
      hunlian: data.hunlian,
      juece: data.juece,
      image: data.image,
    };

    return new Response(JSON.stringify(interpretation), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("解读失败:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "解读过程出现未知错误",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
