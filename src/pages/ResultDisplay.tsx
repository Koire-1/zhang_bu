import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HexagramCard from "@/components/HexagramCard";
import DivinationButton from "@/components/DivinationButton";
import { Hexagram } from "@/data/hexagrams";
import { logger } from "@/lib/logger";

interface Interpretation {
  id: number;
  common_desc1: string;  // 卦名全称
  common_desc2: string;  // 象曰
  common_desc3: string;  // 解卦
  shiye: string;         // 事业
  jingshang: string;     // 经商
  qiuming: string;       // 求名
  waichu: string;        // 外出
  hunlian: string;       // 婚恋
  juece: string;         // 决策
  image?: string;        // 卦图（可选）
}

const ResultDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hexagram = location.state?.hexagram as Hexagram;
  const interpretation = location.state?.interpretation as Interpretation;

  useEffect(() => {
    logger.info('RESULT', '📊 结果页加载', {
      hasHexagram: !!hexagram,
      hasInterpretation: !!interpretation,
      hexagramName: hexagram?.name
    });

    // 如果没有卦象或解读数据，返回首页
    if (!hexagram || !interpretation) {
      logger.warning('RESULT', '⚠️ 数据缺失，返回首页', {
        hasHexagram: !!hexagram,
        hasInterpretation: !!interpretation
      });
      navigate("/");
    } else {
      logger.success('RESULT', '✅ 数据完整，展示解读结果', {
        卦名: interpretation.common_desc1,
        字段数: Object.keys(interpretation).length
      });
    }
  }, [hexagram, interpretation, navigate]);

  if (!hexagram || !interpretation) return null;

  const sections = [
    { title: "事业运势", icon: "💼", content: interpretation.shiye },
    { title: "经商财运", icon: "💰", content: interpretation.jingshang },
    { title: "功名运势", icon: "📚", content: interpretation.qiuming },
    { title: "外出出行", icon: "🧭", content: interpretation.waichu },
    { title: "婚恋情感", icon: "💕", content: interpretation.hunlian },
    { title: "决策建议", icon: "⚖️", content: interpretation.juece },
  ];

  return (
    <div className="min-h-screen px-6 py-12 relative overflow-hidden">
      {/* 八卦背景装饰 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 text-7xl animate-float text-accent">☰</div>
        <div className="absolute top-40 right-20 text-7xl animate-float text-accent" style={{ animationDelay: "1s" }}>☷</div>
        <div className="absolute bottom-40 left-1/3 text-6xl animate-float text-accent/80" style={{ animationDelay: "2s" }}>☯</div>
        <div className="absolute top-1/2 right-10 text-6xl animate-float text-accent/70" style={{ animationDelay: "3s" }}>☵☲</div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* 标题 */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold gradient-text">
            黄小仙解卦
          </h1>
          <p className="text-muted-foreground">
            天机已解，请细细品读
          </p>
        </div>

        {/* 卦象信息 */}
        <div className="max-w-md mx-auto mb-12">
          <HexagramCard hexagram={hexagram} className="scale-90" />
        </div>

        {/* 卦辞总览 */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-accent/20 space-y-6">
          {/* 卦名 */}
          <div className="text-center pb-4 border-b border-accent/20">
            <p className="text-2xl font-bold text-accent">
              {interpretation.common_desc1}
            </p>
          </div>

          <div className="pb-6">
            <h3 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <span>📜</span>
              象曰
            </h3>
            <p className="text-lg leading-relaxed text-foreground/90 italic">
              {interpretation.common_desc2}
            </p>
          </div>

          <div className="border-t border-accent/20 pt-6">
            <h3 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <span>🔮</span>
              解卦
            </h3>
            <p className="text-lg leading-relaxed text-foreground/90">
              {interpretation.common_desc3}
            </p>
          </div>
        </div>

        {/* 详细解读 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed min-h-[160px]">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* 免责声明 */}
        <div className="text-center text-sm text-muted-foreground/60 py-6">
          占卜仅供参考，请相信科学
        </div>

        {/* 操作按钮 */}
        <div className="space-y-4 pb-8">
          <DivinationButton
            variant="gold"
            onClick={() => navigate("/")}
            className="w-full max-w-md mx-auto block"
          >
            返回首页
          </DivinationButton>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
