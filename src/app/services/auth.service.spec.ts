import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return an object that have a token property', () => {
      const login: string = 'test@test.com';
      const password: string = 'Mypassword';
      const mockResponseData = {
        "token": 'dummyToken',
        "user": login
      };

      service.login(login, password).subscribe(
        data => expect(data).toEqual(mockResponseData)
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/auth/login`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ login, password });

      req.flush({
        "status": "success",
        "messages": [],
        "data": mockResponseData
      });
    });

    it('should return an empty object if 404 error', () => {
      const login: string = 'test@test.com';
      const password: string = 'Mypassword';

      service.login(login, password).subscribe(
        data => expect(data).toEqual({})
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/auth/login`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ login, password });

      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#logout', () => {
    it('should perform correctly', () => {
      const mockResponse = {
        "status": "success",
        "messages": [],
        "data": {
          "status": "success",
          "messages": [],
          "data": []
        }
      };

      service.logout().subscribe(
        data => expect(data).toEqual(mockResponse)
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/auth/logout`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({});

      req.flush(mockResponse);
    });
  });
});
