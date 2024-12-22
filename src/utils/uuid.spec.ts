import { uuidv4 } from './uuid';

describe('UUID Generator', () => {
  it('should generate a valid UUID', () => {
    const uuid = uuidv4();
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });
});
