//Import operations module for testing
import * as operations from './../operations';

//Import databaseActions module to be mocked
import { databaseActions } from './../actions'

const databaseActionsMock = jest.fn().mockImplementation();




describe('createUser', () => {
  test('should return that one row was affected in database', done => {
    const response = {rowsAffected: 1};
    const callback = (response) => {
      expect(response.rowsAffected).toBe(1);
      done();
    }
    databaseActionsMock.createUser.mockResolvedValue(response);
    operations.createUser('username', 'password', 'email', 'role', callback, 'userId');
  })
})
