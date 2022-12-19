import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export const mockActivatedRoute = {
  snapshot: { data: {} },
  paramMap: new Observable(),
} as ActivatedRoute;
