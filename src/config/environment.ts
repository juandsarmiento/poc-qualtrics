import Config from 'react-native-config';

class Environment {
  public qualtricsBrandId: string;
  public qualtricsProjectId: string;
  public qualtricsInterceptorId: string;
  constructor() {
    this.qualtricsBrandId = Config.QUALTRICS_BRAND || 'chiper';
    this.qualtricsProjectId = Config.QUALTRICS_PROJECT || '';
    this.qualtricsInterceptorId = Config.QUALTRICS_INTERCEPTOR || '';
    console.log(this.qualtricsProjectId);
    if (!this.qualtricsProjectId) {
      throw new Error('QUALTRICS_PROJECT Required');
    }
    if (!this.qualtricsInterceptorId) {
      throw new Error('QUALTRICS_INTERCEPTOR Requited');
    }
  }
}

export {Environment};
