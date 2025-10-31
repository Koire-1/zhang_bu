import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hexagram } from "@/data/hexagrams";
import { logger } from "@/lib/logger";
import logoImage from "@/assets/huangxiaoxian-logo.png";

const InterpretationLoading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hexagram = location.state?.hexagram as Hexagram;
  const interpretation = location.state?.interpretation;
  const [loadingText, setLoadingText] = useState("小仙正在解答卦象...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    logger.info('LOADING', '🔄 加载页面启动', {
      hasHexagram: !!hexagram,
      hasInterpretation: !!interpretation,
      hexagramName: hexagram?.name
    });

    if (!hexagram || !interpretation) {
      logger.warning('LOADING', '⚠️ 数据缺失，返回首页');
      navigate("/");
      return;
    }

    logger.success('LOADING', '✅ 数据验证通过，开始15秒等待', {
      hexagramId: hexagram.id,
      hexagramName: hexagram.name,
      interpretationId: interpretation.id
    });

    // 加载文案轮换
    const texts = [
      "小仙正在解答卦象...",
      "小仙正在翻阅古籍...",
      "小仙正在参悟天机...",
      "小仙正在为您推演...",
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
      logger.debug('LOADING', `💬 更新文案: ${texts[index]}`);
    }, 3000);

    // 进度条更新（每秒更新一次）
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 100 / 15; // 15秒完成100%
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress <= 100) {
        logger.debug('LOADING', `⏳ 进度更新: ${currentProgress.toFixed(1)}%`);
      }
    }, 1000);

    // 延迟15秒后跳转到结果页
    logger.info('LOADING', '⏰ 设置15秒定时器');
    const timer = setTimeout(() => {
      logger.success('LOADING', '🎉 15秒等待完成，准备跳转');
      logger.info('LOADING', '🚀 跳转到结果页 /result', {
        hexagramName: hexagram.name,
        interpretationFields: Object.keys(interpretation).length
      });
      
      navigate("/result", {
        state: {
          hexagram,
          interpretation,
        },
      });
    }, 15000);

    return () => {
      logger.debug('LOADING', '🧹 清理定时器');
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [hexagram, interpretation, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 八卦背景装饰 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-10 text-9xl animate-float text-accent">☯</div>
        <div className="absolute bottom-1/4 right-10 text-9xl animate-float text-accent" style={{ animationDelay: "1s" }}>☯</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-accent/10 animate-float" style={{ animationDelay: "0.5s" }}>☰☷☵☲☳☴☶☱</div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
        {/* 黄小仙角色 */}
        <div className="relative">
          <img 
            src={logoImage} 
            alt="黄小仙" 
            className="w-48 h-48 mx-auto animate-float"
          />
          {/* 思考符号 */}
          <div className="absolute -right-8 top-0 text-4xl animate-glow-pulse">
            💭
          </div>
          {/* 魔法光效 */}
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" />
        </div>

        {/* 加载文案 */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-accent animate-glow-pulse">
            {loadingText}
          </h2>
          <p className="text-muted-foreground">
            请耐心等待
          </p>
          {/* 显示进度百分比 */}
          <p className="text-sm text-accent/80">
            {Math.floor(progress)}%
          </p>
        </div>

        {/* 进度指示 */}
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterpretationLoading;
