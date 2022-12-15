import jwt_decode from 'jwt-decode';
export class Helper {
  public static isAdmin(): boolean {
    const token = getDecodedAccessToken(localStorage.getItem('token'));
    if (token) {
      if (token.role === 'ADMIN') return true;
    }
    return false;
  }
  public static getUserID(): string {
    const token = getDecodedAccessToken(localStorage.getItem('token'));
    if (token) {
      return token.id;
    }
    return 'no';
  }
}
function getDecodedAccessToken(token: any): any {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
}
