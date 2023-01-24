// Вхідні дані для перевірки
const salaries1 = {
    Manager: { salary: 1000, tax: '10%' },
    Designer: { salary: 600, tax: '30%' },
    Artist: { salary: 1500, tax: '15%' },
  };
  const team1 = [
    { name: 'Misha', specialization: 'Manager' },
    { name: 'Max', specialization: 'Designer' },
    { name: 'Vova', specialization: 'Designer' },
    { name: 'Leo', specialization: 'Artist' },
  ];
  
  const salaries2 = {
    TeamLead: { salary: 1000, tax: '99%' },
    Architect: { salary: 9000, tax: '34%' },
  };
  
  const team2 = [
    { name: 'Alexander', specialization: 'TeamLead' },
    { name: 'Gaudi', specialization: 'Architect' },
    { name: 'Koolhas', specialization: 'Architect' },
    { name: 'Foster', specialization: 'Architect' },
    { name: 'Napoleon', specialization: 'General' },
  ];
  
  // Я НЕ ЗНАЮ, ЯК ЦЮ ЧАСТИНУ, ЩО ВИДІЛЕНА !!!, ЗАНЕСТИ У ФУНКЦІЮ
  
  // Розрахунок кількості спеціалістів кожного напрямку в команді
  const specializations = team => {
    return team.map(teamMember => teamMember.specialization);
  };
  // const specializations = team1.map(teamMember => teamMember.specialization);
  // console.log(specializations);
  
  // !!!
  const res = specializations(team1).reduce((acc, i) => {
    if (acc.hasOwnProperty(i)) {
      acc[i] += 1;
    } else {
      acc[i] = 1;
    }
    return acc;
  }, {});
  
  console.log(res);
  // !!!
  
  // Розрахунок зарплати за кожною спеціалізацією
  const countSalaryPerSpeciality = salaries => {
    const specialitiesArr = Object.keys(salaries);
    const salaryDetailsArr = Object.values(salaries);
  
    const salaryArr = [];
    for (const elem of salaryDetailsArr) {
      const salary = Number.parseInt(elem.salary);
      const tax = Number.parseInt(elem.tax);
  
      salaryArr.push(Math.floor(salary / (1 - tax / 100)));
    }
  
    // console.log(specialitiesArr);
    // console.log(salaryArr);
  
    const salaryPerSpeciality = {};
    for (let i = 0; i < specialitiesArr.length; i += 1) {
      for (let j = 0; j < salaryArr.length; j += 1) {
        if (i === j) {
          salaryPerSpeciality[specialitiesArr[i]] = salaryArr[j];
        }
      }
    }
    return salaryPerSpeciality;
  };
  
  // console.log(countSalaryPerSpeciality(salaries1));
  // console.log(countSalaryPerSpeciality(salaries2)); // {TeamLead: 99999, Architect: 13636} TeamLead:має бути 100000. Чому 99999?????
  
  // Об'єкт зарплат команди
  const calculateTeamFinanceReport = (salaries, team) => {
    const teamFinanceReport = {};
    const keys1 = Object.keys(res);
    const keys2 = Object.keys(countSalaryPerSpeciality(salaries));
    let totalTeamSalary = 0;
    for (const key1 of keys1) {
      for (const key2 of keys2) {
        if (key1 === key2) {
          let finalStr = 'totalBudget'.concat(key1);
          totalTeamSalary +=
            res[key1] * countSalaryPerSpeciality(salaries1)[key2];
          teamFinanceReport.totalBudgetTeam = totalTeamSalary;
          teamFinanceReport[finalStr] =
            res[key1] * countSalaryPerSpeciality(salaries1)[key2];
        }
      }
    }
    return teamFinanceReport;
  };
  
  const financeReport1 = calculateTeamFinanceReport(salaries1, team1);
  const financeReport2 = calculateTeamFinanceReport(salaries2, team2);
  
  console.log(JSON.stringify(financeReport1));
  console.log(JSON.stringify(financeReport2));
  