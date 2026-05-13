type Props = {
    config: any;
    data: any;
};

const Table = ({config, data}: Props) => {
const renderedRows = data.map((company: any) => {
    return (
        <tr key={company.cik}>
            {config.map((val: any) => {
                return <td className="p-3 whitespace-nowrap">{val.render(company)}</td>
            })}
        </tr>
    );
});

const renderedHeaders = config.map((config: any) => {
    return (
        <th className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap' key={config.label}>
            {config.label}
        </th>
    )
})

return (
  <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 overflow-x-auto'>
      <table className='divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
              <tr>{renderedHeaders}</tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
              {renderedRows}
          </tbody>
      </table>
  </div>
)


}

export default Table