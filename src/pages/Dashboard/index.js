import React, { useEffect } from 'react';
import { addMinutes, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const options = { locale: ptBR };
export default function Dashboard() {
  useEffect(() => {
    async function handleSchedule() {
      // const date = new Date();

      // const currentIsoDay = await getISODay(date, options);

      // pegar agendas de todos naquela data e cruzar responsaveis com o start

      const currentSchudule = [
        {
          day: 2,
          start: '08:00',
          responsavel: 1,
        },
        {
          day: 2,
          start: '13:00',
          responsavel: 1,
        },
      ];

      const doctorSchedule = [
        {
          day: 2,
          start: '08:00',
          end: '12:00',
          duration: '20:00',
          responsavel: 1,
        },
        {
          day: 2,
          start: '13:00',
          end: '15:00',
          duration: '30:00',
          responsavel: 1,
        },
      ];

      const newSchedule = [];

      const currentDate = new Date();

      doctorSchedule.map(item => {
        const currentStart = item.start.split(':');
        const currentEnd = item.end.split(':');
        const [duration] = item.duration.split(':');

        let i = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          currentStart[0],
          currentStart[1]
        );

        while (
          i <=
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            currentEnd[0],
            currentEnd[1]
          )
        ) {
          newSchedule.push({
            start: format(i, 'HH:mm', {
              options,
            }),
            responsavel: item.responsavel,
          });
          const parseDate = addMinutes(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              i.getHours(),
              i.getMinutes()
            ),
            duration
          );

          i = parseDate;
        }
      });

      newSchedule.map(item => {
        const verify = currentSchudule.find(
          registro =>
            registro.responsavel === item.responsavel &&
            registro.start === item.start
        );

        if (verify) {
          item.start = `já marcado - ${item.start}`;
        }
        return item;
      });

      console.log(newSchedule);
    }

    handleSchedule();
  }, []);

  return <>22323</>;
}
