import { RAFormModule } from './ra-form.module';

describe('RaformModule', () => {
  let raformModule: RAFormModule;

  beforeEach(() => {
    raformModule = new RAFormModule();
  });

  it('should create an instance', () => {
    expect(raformModule).toBeTruthy();
  });
});
