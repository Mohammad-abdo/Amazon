import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { PLACEHOLDER_IMAGE } from '@/lib/api'

type ProductImageProps = Omit<ImageProps, 'src'> & { src: string }

const ProductImage = ({ src, alt, ...rest }: ProductImageProps) => {
  const [errored, setErrored] = useState(false)

  return (
    <Image
      {...rest}
      alt={alt}
      src={!src || errored ? PLACEHOLDER_IMAGE : src}
      onError={() => setErrored(true)}
    />
  )
}

export default ProductImage
