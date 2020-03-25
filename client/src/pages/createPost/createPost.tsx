import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtListItem, AtActionSheet, AtActionSheetItem, AtButton } from 'taro-ui'
import Title from '../../components/title'
// import graphql from '../../api/graphql'
import { UploadImage } from '../../components'
import graphql from '../../api/graphql'
import { createProduct } from "../../api/gpl";
import './createPost.scss'

type PageState = {
  products: {
    title: string,
    description: string,
    expiryTime: string,
    // categoryId: string,
    // categoryName: string
  },
  categoryList: Array<{
    name: string,
    id: string
  }>,
  showCategory: boolean
}

export default class Add extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      products: {
        title: '',
        description: '',
        expiryTime: '2020-03-15T00:48:09Z',
        // categoryId: '',
        // categoryName: ''
      },
      // categoryList: [],
      // showCategory: false
    }
  }

  componentDidMount() {
    // this.getCategory()
  }

  config: Config = {
    navigationBarTitleText: '添加'
  }

  // getCategory = async () => {
  //   const res = await graphql.query({ query: category })
  //   this.setState({
  //     categoryList: res.data.category,
  //     garbage: { ...this.state.garbage, categoryId: res.data.category[0].id, categoryName: res.data.category[0].name, name: this.$router.params.name }
  //   })
  // }

  handleChangeName = (value) => {
    this.setState({
      products: { ...this.state.products, title: value }
    })
    return value
  }

  handleChangeDescription = (event) => {
    this.setState({
      products: { ...this.state.products, description: event.target.value }
    })
  }

  // handleChangeType = (item) => {
  //   this.setState({
  //     products: { ...this.state.products, categoryId: item.id, categoryName: item.name },
  //     showCategory: false
  //   })
  // }

  handleInput = async () => {
    const { products } = this.state
    console.log(products)
    console.log(createProduct)
    const res = await graphql.mutate({ mutation: createProduct, variables: products })
    // const res = await graphql.mutate({ mutation: gql`mutation {createPost(post: {description: "dfsf", expiryTime:"2020-03-15T00:48:09Z"})}`} );

    if (res.data.createProduct) {
      Taro.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      Taro.navigateBack()
    }
  }

  renderForm = () => {
    const { products } = this.state
    return (
      <View>
        <View className='section'>
          <Title title='商品名称'></Title>
          <AtInput
            name='title'
            title='名称'
            type='text'
            placeholder='请输入商品名称'
            value={products.title}
            onChange={this.handleChangeName.bind(this)}
          />
        </View>
        {/*<View className='section'>*/}
        {/*  <Title title='垃圾类别'></Title>*/}
        {/*  <AtListItem title='类别' extraText={garbage.categoryName} onClick={() => {*/}
        {/*    this.setState({ showCategory: true })*/}
        {/*  }}*/}
        {/*  />*/}
        {/*</View>*/}
        <View className='section'>
          <Title title='描述'></Title>
          <AtTextarea
            value={products.description}
            onChange={this.handleChangeDescription.bind(this)}
            maxLength={200}
            placeholder='请输入商品描述'
          />
          <UploadImage />
        </View>
        <View className='section'>
          <AtButton type='primary' onClick={this.handleInput.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }

  // renderCategory = () => {
  //   const { categoryList, showCategory } = this.state
  //   return (
  //     <View>
  //       <AtActionSheet isOpened={showCategory}>
  //         {categoryList && categoryList.map((item) => {
  //           return (
  //             <AtActionSheetItem key={item.id} onClick={() => {
  //               this.handleChangeType(item)
  //             }}
  //             >{item.name}</AtActionSheetItem>
  //           )
  //         })}
  //       </AtActionSheet>
  //     </View>
  //   )
  // }

  render() {
    return (
      <View className='add'>
        {this.renderForm()}
        {/*{this.renderCategory()}*/}
      </View>
    )
  }
}
