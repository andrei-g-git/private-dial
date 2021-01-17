import SaverAndLoader from '@/js/SaverAndLoader.js'

let saverLoader = new SaverAndLoader();

describe('SaverAndLoader', () => {
    it('saves simple values correctly', () => {
        var valueToSave = 21;
        saverLoader.saveValue('valueToSave', valueToSave);
        var loadedValue = saverLoader.loadValue('valueToSave');
        expect(loadedValue).toEqual(valueToSave);
    });

    it('saves objects correctly', () => {
        var objectToSave = {
            name: 'Scoot Toot',
            occupation: 'Being Irresistable'
        };
        saverLoader.saveObject('objectToSave', objectToSave);
        var loadedObject = saverLoader.loadObject('objectToSave');
        expect(loadedObject).toStrictEqual(objectToSave);
        expect(loadedObject.name).toBe('Scoot Toot');
        expect(loadedObject.occupation).toBe('Being Irresistable');
    });
});