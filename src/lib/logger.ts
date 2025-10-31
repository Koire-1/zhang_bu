/**
 * 统一的日志工具
 * 提供带时间戳、颜色标识的日志输出
 */

type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'debug';

interface LogOptions {
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

const LOG_STYLES = {
  info: 'color: #3b82f6; font-weight: bold',      // 蓝色
  success: 'color: #10b981; font-weight: bold',   // 绿色
  warning: 'color: #f59e0b; font-weight: bold',   // 橙色
  error: 'color: #ef4444; font-weight: bold',     // 红色
  debug: 'color: #8b5cf6; font-weight: bold',     // 紫色
};

const LOG_EMOJI = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
  debug: '🔍',
};

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private formatTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('zh-CN', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  }

  private log({ level, module, message, data }: LogOptions) {
    if (!this.isDevelopment && level === 'debug') return;

    const time = this.formatTime();
    const emoji = LOG_EMOJI[level];
    const style = LOG_STYLES[level];
    
    console.log(
      `%c[${time}] ${emoji} [${module.toUpperCase()}] ${message}`,
      style
    );

    if (data !== undefined) {
      console.log('%c📦 数据:', 'color: #6b7280; font-weight: bold', data);
    }
  }

  info(module: string, message: string, data?: any) {
    this.log({ level: 'info', module, message, data });
  }

  success(module: string, message: string, data?: any) {
    this.log({ level: 'success', module, message, data });
  }

  warning(module: string, message: string, data?: any) {
    this.log({ level: 'warning', module, message, data });
  }

  error(module: string, message: string, data?: any) {
    this.log({ level: 'error', module, message, data });
  }

  debug(module: string, message: string, data?: any) {
    this.log({ level: 'debug', module, message, data });
  }

  // 性能监控
  startTimer(label: string): () => void {
    const start = performance.now();
    this.debug('TIMER', `⏱️ 开始计时: ${label}`);
    
    return () => {
      const duration = (performance.now() - start).toFixed(2);
      this.debug('TIMER', `⏱️ ${label} 耗时: ${duration}ms`);
    };
  }
}

export const logger = new Logger();

