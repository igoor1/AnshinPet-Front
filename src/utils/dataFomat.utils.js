import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

const CalcularIdade = (date) => {
    if (!date) return "Data não disponível";

    const parsedDate = typeof date === "string" || typeof date === "number" ? new Date(date) : date;

    const anos = differenceInYears(new Date(), parsedDate);
    const meses = differenceInMonths(new Date(), parsedDate) % 12;
    const dias = differenceInDays(new Date(), parsedDate) % 30;

    let idadeStr = '';
    if (anos > 0) idadeStr += `${anos} anos `;
    if (meses > 0) idadeStr += `${meses} meses `;
    if (dias > 0) idadeStr += `${dias} dias`;

    return idadeStr.trim() || "Menos de um dia";
};

export default CalcularIdade