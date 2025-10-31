import { useNavigate } from "react-router-dom";
import DivinationButton from "@/components/DivinationButton";
import logoImage from "@/assets/huangxiaoxian-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 八卦背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-float text-accent">☰</div>
        <div className="absolute top-10 right-10 text-6xl animate-float text-accent" style={{ animationDelay: "1s" }}>☷</div>
        <div className="absolute top-1/3 left-20 text-5xl animate-float text-accent/80" style={{ animationDelay: "2s" }}>☵</div>
        <div className="absolute top-1/3 right-20 text-5xl animate-float text-accent/80" style={{ animationDelay: "3s" }}>☲</div>
        <div className="absolute bottom-32 left-1/4 text-6xl animate-float text-accent/70" style={{ animationDelay: "4s" }}>☳</div>
        <div className="absolute bottom-32 right-1/4 text-6xl animate-float text-accent/70" style={{ animationDelay: "5s" }}>☴</div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
        {/* Logo/品牌区 */}
        <div className="space-y-4">
          <img 
            src={logoImage} 
            alt="黄小仙" 
            className="w-32 h-32 mx-auto animate-float"
          />
          <h1 className="text-5xl md:text-6xl font-bold gradient-text">
            黄小仙来占卜啦
          </h1>
          <p className="text-xl text-muted-foreground">
            传承千年易经智慧 · 探寻命运玄机
          </p>
        </div>

        {/* 占卜说明 */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-accent/20 shadow-lg">
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-foreground/90">
              静默一分钟，心念集中于你所测之事
            </p>
            <p className="text-accent/80">
              如爱情、事业、健康等
            </p>
            <p className="text-foreground/90">
              心念一动，点击摇卦
            </p>
            <p className="text-muted-foreground text-base">
              掷出中国古铜钱，查看卦辞，请自行体会其中的吉凶指示
            </p>
          </div>
        </div>

        {/* 主按钮 */}
        <div className="pt-4">
          <DivinationButton
            variant="gold"
            onClick={() => navigate("/shaking")}
            className="w-full max-w-md"
          >
            立即占卜
          </DivinationButton>
        </div>

        {/* 装饰文字 */}
        <p className="text-sm text-muted-foreground/60">
          "天行健，君子以自强不息"
        </p>
      </div>
    </div>
  );
};

export default Welcome;
