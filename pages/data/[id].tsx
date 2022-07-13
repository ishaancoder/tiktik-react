import { GetServerSideProps } from 'next'
import React from 'react'

const Data = ({data}:{ data:number }) => {
  return (
    <div>{ data }</div>
  )
}

export async function getServerSideProps({params:{id}}:{params:{id :number}}) {
  return {
    props: {
        data: id
    }, // will be passed to the page component as props
  }
}

export default Data