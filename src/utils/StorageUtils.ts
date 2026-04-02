import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export class StorageUtils {
  platformId = inject(PLATFORM_ID);
  getTenantId() {
    if(isPlatformBrowser(this.platformId)){
      const id = localStorage.getItem('tenant');
      return id ? id : null;
    }
    return null;
  }
  getBearerToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return token ? `Bearer ${token}` : null;
    }
    return null;
  }
}
