import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DivinationButton from "@/components/DivinationButton";
import { hexagrams } from "@/data/hexagrams";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";
import coinFront from "@/assets/coin-front.png";
import coinSpinning from "@/assets/coin-spinning.gif";

const ShakingCoins = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isStopped, setIsStopped] = useState(false);
  const coinSrc = coinSpinning;

  const handleStop = async () => {
    const endTimer = logger.startTimer('摇卦API调用');
    logger.info('SHAKING', '🎲 用户点击停止摇卦');
    
    setIsStopped(true);
    
    try {
      // 通过 Vite 代理调用缘份居 API
      logger.debug('SHAKING', '📡 准备调用缘份居API');
      
      const formData = new URLSearchParams();
      formData.append("api_key", "6tR4JHkx4OhLjm8lZjC9tY8Kh");
      formData.append("lang", "zh-cn");

      logger.debug('SHAKING', '📤 发送API请求', {
        url: '/api/index.php/v1/Zhanbu/yaogua',
        method: 'POST',
        params: { lang: 'zh-cn' }
      });

      const response = await fetch("/api/index.php/v1/Zhanbu/yaogua", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      logger.debug('SHAKING', '📥 收到API响应', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        throw new Error(`API 调用失败: ${response.status} ${response.statusText}`);
      }

      const apiData = await response.json();
      
      logger.success('SHAKING', '✨ API返回数据解析成功', {
        errcode: apiData.errcode,
        errmsg: apiData.errmsg,
        dataExists: !!apiData.data
      });

      if (apiData.errcode !== 0) {
        logger.error('SHAKING', '❌ API返回错误码', {
          errcode: apiData.errcode,
          errmsg: apiData.errmsg
        });
        throw new Error(apiData.errmsg || "占卜服务异常");
      }

      const data = apiData.data;
      
      logger.info('SHAKING', '🎴 获得卦象数据', {
        id: data.id,
        name: data.common_desc1,
        hasAllFields: !!(data.shiye && data.jingshang && data.qiuming && data.waichu && data.hunlian && data.juece)
      });
      
      // 根据 API 返回的 id 匹配本地卦象样式数据
      const hexagramStyle = hexagrams.find(h => h.id === data.id);
      
      if (!hexagramStyle) {
        logger.error('SHAKING', '❌ 卦象ID匹配失败', { 
          apiId: data.id,
          localHexagramsCount: hexagrams.length 
        });
        throw new Error("卦象数据匹配失败");
      }

      logger.success('SHAKING', '✅ 卦象样式匹配成功', {
        id: hexagramStyle.id,
        name: hexagramStyle.name,
        code: hexagramStyle.code,
        symbol: hexagramStyle.symbol
      });
      
      // 组装完整数据
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

      logger.success('SHAKING', '📦 解读数据组装完成', {
        fieldsCount: Object.keys(interpretation).length,
        卦名: interpretation.common_desc1
      });

      endTimer();
      
      // 延迟跳转，让用户看到定格效果
      logger.info('SHAKING', '⏳ 1秒后跳转到卦象展示页');
      setTimeout(() => {
        logger.info('SHAKING', '🚀 跳转到 /hexagram', {
          hexagramName: hexagramStyle.name,
          interpretationId: interpretation.id
        });
        
        navigate("/hexagram", { 
          state: { 
            hexagram: hexagramStyle,  // 卦象样式（name, code, symbol）
            interpretation: interpretation      // API解读数据
          } 
        });
      }, 1000);
      
    } catch (error) {
      endTimer();
      logger.error('SHAKING', '💥 摇卦失败', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      
      console.error("摇卦失败:", error);
      toast({ 
        title: "摇卦失败", 
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive"
      });
      setIsStopped(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 八卦背景装饰 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-10 text-8xl text-accent animate-float">☰</div>
        <div className="absolute top-1/3 right-20 text-8xl text-accent animate-float" style={{ animationDelay: "1s" }}>☷</div>
        <div className="absolute bottom-1/3 left-1/3 text-7xl text-accent/80 animate-float" style={{ animationDelay: "2s" }}>☯</div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
        {/* 状态提示 */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-accent animate-glow-pulse">
            {isStopped ? "定格中..." : "诚心摇卦中..."}
          </h2>
          <p className="text-muted-foreground">
            {isStopped ? "天机已现" : "心念所想，静待时机"}
          </p>
        </div>

        {/* 六枚钱币排成一排动态效果 */}
        <div className="relative py-16">
          {/* 多层背景光晕 */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
            <div className="w-full max-w-3xl h-40 bg-accent/20 blur-3xl animate-glow-pulse" />
            <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-2xl animate-pulse" />
          </div>
          
          {/* 钱币排列 */}
          <div className="relative z-20 flex justify-center items-center gap-6 md:gap-8 h-36 md:h-44 overflow-visible">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  opacity: isStopped ? 0.7 : 1,
                }}
              >
                <img 
                  src={coinSrc}
                  alt="转动铜钱"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = coinFront; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 停止按钮 */}
        {!isStopped && (
          <div className="pt-4">
            <DivinationButton
              variant="primary"
              onClick={handleStop}
              className="w-full max-w-md"
            >
              心念一动，停！
            </DivinationButton>
          </div>
        )}

        {/* 引导提示 */}
        <p className="text-sm text-muted-foreground/60">
          当您感觉时机到了，点击停止摇卦
        </p>
      </div>
    </div>
  );
};

// 需要导入 cn 函数
export default ShakingCoins;
