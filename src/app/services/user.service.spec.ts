import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';
import { UserService } from './user.service';
import { HttpResponse } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    let expectedUsers: User[];

    beforeEach(() => {
      expectedUsers = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Cena',
          email: 'john.cena@wwe.com',
          password: 'Johncena123'
        }
      ];
    });

    it('should return expected users', () => {
      service.getUsers().subscribe(users => {
        expect(users).toEqual(expectedUsers);
      });

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/users`);
      expect(req.request.method).toEqual('GET');
      req.flush({ data: expectedUsers });
    });

    it('should turn 404 error into an empty users result', () => {
      service.getUsers().subscribe({
        next: users => expect(users.length).toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/users`);

      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#updateUser', () => {
    let updateUserId: number;
    let updateUser: User;

    beforeEach(() => {
      updateUserId = 1;
      updateUser = {
        id: updateUserId,
        firstName: 'John',
        lastName: 'Cena',
        email: 'john.cena@wwe.com',
        password: 'Johncena123'
      };
    });

    it('should update a user and return it', () => {
      service.updateUser(updateUserId, updateUser).subscribe(data =>
        expect(data).toEqual(updateUser)
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/users/${updateUserId}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual({ firstName: updateUser.firstName, lastName: updateUser.lastName });

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: {
          data: updateUser
        }
      });

      req.event(expectedResponse);
    });

    it('should turn 404 error into return of null', () => {
      service.updateUser(updateUserId, updateUser).subscribe({
        next: data => expect(data).toEqual(null),
        error: fail,
      });

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/users/${updateUserId}`);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#addUser', () => {
    let mockUser: User;
    let expectedUser: User;

    beforeEach(() => {
      mockUser = {
        firstName: 'John',
        lastName: 'Cena',
        email: 'john.cena@wwe.com',
        password: 'Johncena123'
      };
      expectedUser = {
        id: 1,
        ...expectedUser
      };
    });

    it('should add a user and return it', () => {
      service.addUser(mockUser).subscribe(data =>
        expect(data).toEqual(expectedUser)
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/users`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockUser);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: {
          data: expectedUser
        }
      });

      req.event(expectedResponse);
    });

    it('should turn 404 error into return of null', () => {
      service.addUser(mockUser).subscribe({
        next: data => expect(data).toEqual(null),
        error: fail,
      });

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/users`);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#deleteUser', () => {
    it('should delete a user and return success message', () => {
      const deleteUserId: number = 1;
      const deleteResponse = {
        "status": "success",
        "messages": [
          {
            "code": "UserManagerUserDelete",
            "value": "Delete the requested User successfully"
          }
        ],
        "data": []
      };

      service.deleteUser(deleteUserId).subscribe(data =>
        expect(data).toEqual(deleteResponse)
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/v1/users/${deleteUserId}`);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: deleteResponse
      });

      req.event(expectedResponse);
    });
  });
});
