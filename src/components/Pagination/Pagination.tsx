interface PaginationProps {
  setCurrentUrl: (currentUrl: string) => void;
  previousUrl: string;
  nextUrl: string
}

export default function Pagination({setCurrentUrl, previousUrl, nextUrl}: PaginationProps) {
  return (
    <div className='container my-6'>
      <div className="pagination is-centered">
        {previousUrl && 
          <button 
            className="pagination-previous"
            onClick={() => {
              setCurrentUrl(previousUrl)
            }}
          >
            Previous
          </button>
        }

        {nextUrl && 
          <button 
            className="pagination-next"
            onClick={() => {
              setCurrentUrl(nextUrl)
            }}
          >
            Next page
          </button>
        }

        {/* // TODO: Dynamiser les nombres de pages */}
        <ul className="pagination-list">
          <li><button className="pagination-link is-current">1</button></li>
          <li><button className="pagination-link">2</button></li>
          <li><button className="pagination-link">3</button></li>
          <li><span className="pagination-link">4</span></li>
          <li><button className="pagination-link">5</button></li>
          <li><button className="pagination-link">6</button></li>
          <li><button className="pagination-link">7</button></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><button className="pagination-link">86</button></li>
        </ul>
      </div>
    </div>
  )
}