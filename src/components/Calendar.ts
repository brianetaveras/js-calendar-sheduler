interface calendarInterface {
    containerID: string
}

class Calendar {
    container: any;
    currentMonth: number;
    currentYear: number;
    currentDay: number;
    months: any;
    selectedMonth: number;
    constructor(params: { containerID: string }) {
        this.container = document.getElementById(params.containerID);
        this.currentMonth = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
        this.currentDay = new Date().getDate();
        this.selectedMonth = this.currentMonth;
        this.months = [
            null,
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        this.createCalendar()
    }
    public createCalendar(): void {
        this.drawCalendar();

    }

    private drawCalendar(): void {

        const currentMonthDays = this.getMonthDays();
        let days = []

        for (let i = 1; i <= currentMonthDays; i++) {
            days.push(i)
        }

        this.container.innerHTML = `
        <div class="calendar-wrapper">
            <div class="calendar-header">
                <div class="calendar-month">${this.months[this.selectedMonth]}</div>
                <div class="ctas">
                    <a id="calendar-prev-month" href="#">&#x2039;</a>
                    <a id="calendar-next-month" href="#">&#x203A;</a>
                </div>
            </div>
            <div class="calendar-days-header">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
            </div>

            <div class="calendar-days">
            ${days.map(el => {

            return `
            <div class="day">
                <input ${el == this.currentDay ? 'checked' : ''} value="${el}" type="radio" name="day">
                <span>${el}</span>
            </div>
                
                `

        }).join('')}
               
            </div>`

        const nextButton: HTMLElement | null = document.getElementById('calendar-next-month');
        const prevButton: HTMLElement | null = document.getElementById('calendar-prev-month');

        nextButton?.addEventListener('click', () => {
            this.nextMonth();
        })
        prevButton?.addEventListener('click', () => {
            this.previousMonth();
        })

    }

    private getMonthDays(): number {
        const currentMonthDays: number = new Date(this.currentYear, this.selectedMonth, 0).getDate();
        return currentMonthDays;
    }

    private nextMonth(): void {
        if (this.selectedMonth < 12) {
            this.selectedMonth++;
            this.drawCalendar()
        }
    }

    private previousMonth(): void {
        if (this.selectedMonth > 1) {
            this.selectedMonth--;
            this.drawCalendar()
        }
    }
}

export default Calendar;