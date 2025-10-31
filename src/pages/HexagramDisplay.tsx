import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HexagramCard from "@/components/HexagramCard";
import DivinationButton from "@/components/DivinationButton";
import { Hexagram } from "@/data/hexagrams";
import { logger } from "@/lib/logger";

const HexagramDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hexagram = location.state?.hexagram as Hexagram;
  const interpretation = location.state?.interpretation;

  useEffect(() => {
    logger.info('HEXAGRAM', '📄 卦象展示页加载', {
      hasHexagram: !!hexagram,
      hasInterpretation: !!interpretation,
      hexagramName: hexagram?.name
    });

    // 如果没有卦象数据或解读数据，返回首页
    if (!hexagram || !interpretation) {
      logger.warning('HEXAGRAM', '⚠️ 数据缺失，返回首页', {
        hasHexagram: !!hexagram,
        hasInterpretation: !!interpretation
      });
      navigate("/");
    }
  }, [hexagram, interpretation, navigate]);

  if (!hexagram) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* 八卦背景装饰 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-10 text-9xl rotate-12 text-accent animate-float">☯</div>
        <div className="absolute bottom-1/4 right-10 text-9xl -rotate-12 text-accent animate-float" style={{ animationDelay: "1.5s" }}>☯</div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl text-accent/70 animate-float" style={{ animationDelay: "0.5s" }}>☰☷☵☲☳☴☶☱</div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-2xl w-full space-y-12">
        {/* 标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold gradient-text">
            卦象已成
          </h1>
          <p className="text-muted-foreground">
            天机已显，诚心求解
          </p>
        </div>

        {/* 卦象卡片 */}
        <div className="animate-scale-in">
          <HexagramCard hexagram={hexagram} />
        </div>

        {/* 提示区 */}
        <div className="text-center space-y-6">
          <p className="text-xl text-accent">
            黄小仙为您解答
          </p>

          {/* 操作按钮 */}
          <div className="space-y-4">
            <DivinationButton
              variant="gold"
              onClick={() => {
                logger.info('HEXAGRAM', '👆 用户点击查看解答', {
                  hexagramId: hexagram.id,
                  hexagramName: hexagram.name
                });
                navigate("/interpretation", { 
                  state: { 
                    hexagram,
                    interpretation 
                  } 
                });
              }}
              className="w-full"
            >
              查看解答
            </DivinationButton>
            
            <div className="flex gap-4">
              <DivinationButton
                variant="secondary"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                返回首页
              </DivinationButton>
              <DivinationButton
                variant="secondary"
                onClick={() => navigate("/shaking")}
                className="flex-1"
              >
                重新占卜
              </DivinationButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexagramDisplay;
