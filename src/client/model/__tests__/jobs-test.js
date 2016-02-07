jest.dontMock('../jobs');

var Jobs = require('../jobs');


describe('job model tests', () => {

    describe('salary filter tests', () => {
        var jobs;
        var dummy = [{salary: 3000}, {salary: 10000}];

        beforeEach(() => {
            jobs = new Jobs(dummy);
        });

        it('should get all jobs with no filter', () => {
            // Assert
            expect(jobs.get()).toEqual(dummy);
        });

        it('should filter by salary', () => {
            // Act
            jobs.addFilter('salarylt7000', 'j.salary < 7000');

            // Assert
            expect(jobs.get()).toEqual([{salary: 3000}]);
        });

        it('should return empty results', () => {
            // Act
            jobs.addFilter('salarylt2000', 'j.salary < 2000');

            // Assert
            expect(jobs.get()).toEqual([]);
        });

        it('should remove filter that has beed added', () => {
            // Arrange
            jobs.addFilter('salarylt7000', 'j.salary < 7000');

            // Act
            jobs.removeFilter('salarylt7000');

            // Assert
            expect(jobs.get()).toEqual(dummy);
        });

        it('should get the filter as undefined', () => {
            // Act
            var filterValue = jobs.getFilter('filterbysal');

            // Assert
            expect(filterValue).toBe(undefined);

        });

        it('should get filter name as set', () => {
            // Arrange
            jobs.addFilter('filterbysal', 'j.salary < 7000');

            // Act
            var filterValue = jobs.getFilter('filterbysal');

            // Assert
            expect(filterValue).toBe('j.salary < 7000');

        });

    });


});
