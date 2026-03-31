export class StorageUtils{
  static getTenantId(){
    return localStorage.getItem('tenant');
  }

  static getBearerToken(){
    return localStorage.getItem('token');
  }
}
