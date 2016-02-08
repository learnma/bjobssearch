jest.dontMock('moment');
jest.dontMock('../jobs');

var JobFactory = require('../jobs');

describe('job model tests', () => {

    describe('salary filter tests', () => {

        var jobs;
        var dummy = [{salary: 3000}, {salary: 10000}];

        beforeEach(() => {
            jobs = JobFactory.create(dummy);
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


    describe('posted date filter tests', () => {
        var jobs;
        var dummy = [{date: '20/01/2016'}, {date: '15/12/2015'}];

        beforeEach(() => {
            jobs = JobFactory.create(dummy);
        });

        it('test posted within 30 days', () => {
            // Arrange
            let filter = 'moment().diff(moment(j.date, "DD-MM-YYYY"), "days") <= 30';
            jobs.addFilter('filterbydate', filter);

            // Act
            expect(jobs.get()).toEqual([{date: '20/01/2016'}]);
        });

        it('test posted within 60 days', () => {
            // Arrange
            let filter = 'moment().diff(moment(j.date, "DD-MM-YYYY"), "days") <= 60';
            jobs.addFilter('filterbydate', filter);

            // Act
            expect(jobs.get()).toEqual(dummy);
        });

    });


    describe('sorting tests - by salary', () => {
        var jobs;
        var dummy = [{salary: 2000}, {salary: 8000}];

        beforeEach(() => {
            jobs = JobFactory.create(dummy);
        });

        it('should sort by highest salary', () => {
            // Arrange
            jobs.setSortCriteria('-j.salary');

            // Act
            var actual = jobs.get();

            // Assert
            expect(actual).toEqual([{salary: 8000}, {salary: 2000}]);
        });

        it('should sort by highest salary', () => {
            // Arrange
            jobs = JobFactory.create([{salary: 2000},{salary: 1000}]);
            jobs.setSortCriteria('j.salary');

            // Act
            var actual = jobs.get();

            // Assert
            expect(actual).toEqual([{salary: 1000}, {salary: 2000}]);
        });

        it('should not sort after clear criteria', () => {
            // Arrange
            jobs.setSortCriteria('-j.salary');
            jobs.removeSortCriteria();

            // Act
            var actual = jobs.get();

            // Assert
            expect(actual).toEqual([{salary: 2000}, {salary: 8000}]);

        });

    });

    describe('sorting tests - by date', () => {
        var jobs;
        var dummy = [{date: '06/07/2015'}, {date: '06/01/2016'}];

        beforeEach(() => {
            jobs = JobFactory.create(dummy);
        });

        it('should sort by date', () => {
            // Arrange
            jobs.setSortCriteria('-moment(j.date, "DD-MM-YYYY")');

            // Act
            var actual = jobs.get();

            // Assert
            expect(actual).toEqual([{date: '06/01/2016'}, {date: '06/07/2015'}]);
        });

        it('should handle equal dates', () => {
            // Arrange
            dummy.push({date: '06/07/2015'});
            jobs = JobFactory.create(dummy);
            jobs.setSortCriteria('moment(j.date, "DD-MM-YYYY")');

            // Act
            var actual = jobs.get();

            // Assert
            expect(actual).toEqual([{date: '06/07/2015'}, {date: '06/07/2015'}, {date: '06/01/2016'}]);
        });
    });

    describe('filtering and sorting tests', () => {
        var jobs;
        var dummy = [{salary: 2000}, {salary: 8000}, {salary: 6000}];

        beforeEach(() => {
            jobs = JobFactory.create(dummy);
        });

        it('should sort by highest salary after filtering', () => {
            // Arrange
            jobs.addFilter('f1','j.salary > 3000');
            jobs.setSortCriteria('-j.salary');

            // Act
            var actual = jobs.get();

            // Assert
            expect(actual).toEqual([{salary: 8000}, {salary: 6000}]);
        });

    });

});
