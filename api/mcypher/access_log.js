const axios = require('axios');
const crypto = require('crypto');


class AccessLog {
  static logs = [];
  static email = null
  static plusValue = 1

  static setEmail(email) {
    this.email = email;
  }

  static generateRandomString(length = 20) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }


  static addLog(log) {
    console.log("[AccessLog] LOG TYPE:", log.type);
    this.logs.push({
      ...log,
      loggedAt: new String(new Date().getTime()) + `_${this.plusValue}`,
    });
    this.plusValue += 1;
  }

  static flushEmail() {
    this.email = null;
  }

  static flushLogs() {
    this.logs = [];
  }

  static async sendLogs() {
    console.log("[AccessLog] Sending logs to server...", this.logs.map(log => log.type));
    const url = 'https://53rxlci0ya.execute-api.ap-northeast-2.amazonaws.com/logs';

    const uuid = crypto.randomUUID();
    const payload = {
      log: this.logs.map(log => {
        const { loggedAt, type, ...payload } = log;

        return {
          id: "ID",
          loggedAt: log.loggedAt,
          sessionId: uuid,
          email: this.email,
          type: log.type,
          payload: JSON.stringify(payload),
        };
      }),
    };
    console.log("[AccessLog] Payload:", payload);

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ [AccessLog] Response:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('❌ [AccessLog] Error Response:', error.response.status, error.response.data);
      } else {
        console.error('❌ [AccessLog] Error:', error.message);
      }
    }

    this.flushEmail();
    this.flushLogs();
    this.plusValue = 1;
  }
}


module.exports = AccessLog;
