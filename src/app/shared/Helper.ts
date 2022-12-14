import jwt_decode from 'jwt-decode';
export class Helper {
  public static isAdmin(): boolean {
    const token = getDecodedAccessToken(localStorage.getItem('token'));
    if (token) {
      if (token.role === 'ADMIN') return true;
    }
    return false;
  }
  public static ispis(): string {
    console.log('TEST');
    return 'TEST';
  }
}
function getDecodedAccessToken(token: any): any {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
}
