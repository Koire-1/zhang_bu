import { Hexagram } from "@/data/hexagrams";
import { cn } from "@/lib/utils";

interface HexagramCardProps {
  hexagram: Hexagram;
  className?: string;
}

const HexagramCard = ({ hexagram, className }: HexagramCardProps) => {
  // 将卦象编码转换为爻（按从上到下渲染，首位为上爻）
  const renderYao = (code: string) => {
    return code.split("").map((bit, index) => {
      if (bit === "1") {
        // 阳爻：整线，细且等距
        return (
          <div
            key={index}
            className="w-full h-1.5 bg-accent transition-all duration-300"
          />
        );
      } else {
        // 阴爻：两段短线，中间留白更宽
        return (
          <div key={index} className="w-full h-1.5 flex items-stretch justify-between">
            <div className="h-full w-[42%] bg-accent transition-all duration-300" />
            <div className="h-full w-[42%] bg-accent transition-all duration-300" />
          </div>
        );
      }
    });
  };

  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl bg-card border-2 border-accent/30",
        "shadow-[0_0_40px_rgba(234,179,8,0.2)]",
        "backdrop-blur-sm",
        className
      )}
    >
      {/* 装饰边角 */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-accent/50 rounded-tl-lg" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-accent/50 rounded-tr-lg" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-accent/50 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-accent/50 rounded-br-lg" />

      {/* 六爻显示 */}
      <div className="mx-auto mb-6 w-[140px] sm:w-[160px] space-y-2">
        {renderYao(hexagram.code)}
      </div>

      {/* 卦名和编号 */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-accent gradient-text">
          {hexagram.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          第{hexagram.id}卦
        </p>
      </div>
    </div>
  );
};

export default HexagramCard;
