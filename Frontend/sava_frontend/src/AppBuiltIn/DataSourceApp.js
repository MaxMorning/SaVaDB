import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

import "antd/dist/antd.min.css";

export default class DataSourceApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row gutter={[12, 12]}>
                <Col span={12}>
                    <Card
                        title={'各地区统计数据'}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                        {
`各地区确诊、死亡、治愈数据来源于约翰霍普金斯大学的新冠疫情数据统计项目，其数据仓库地址为\'https://github.com/CSSEGISandData/COVID-19\'，由SaVaDB进行爬取、清洗和入库。SaVaDB基于自身立场与国际普遍共识，对原始仓库的部分地区命名进行了调整。
部分地区缺失治愈数据，SaVaDB选择沿用最近的有效治愈数据。
该仓库的数据来源于各地区政府的统计信息。请注意，由于COVID疫情的特殊政治性，部分地区可能存在数据多报与漏报的情况，请注意甄别。
`
                        }
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title={'生物学数据'}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                        {
`生物学信息包括病毒变种cDNA序列和谱系信息。
前者数据来源于美国国家生物技术信息中心，由SaVaDB进行爬取、清洗和入库。由于目前学术界并未明确界定各个变种的参考序列，SaVaDB取各个变种中的一条cDNA序列作为该变种的参考序列。
后者数据来源于http://cov-lineages.org/lineage_list.html，由SaVaDB在爬取、清洗后由工作人员处理并自动入库。
`
                        }
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title={'疫情防治数据'}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                        {
`目前防治数据由WHO命名和监视等级两部分组成。
这两部分数据均来源于世界卫生组织WHO官方网站who.int，由工作人员手动添加。
`
                        }
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title={'数据所有权归属与使用许可'}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
{
`各地区确诊、死亡、治愈数据来自美国约翰霍普金斯大学，采用CC BY 4.0协议，版权归约翰霍普金斯大学所有。
cDNA序列信息来自NCBI数据库，属于公共领域。NCBI旨在为科学界提供及时和全面的信息来源。因此，NCBI本身对其中包含的数据的使用或分发没有任何限制。然而，一些已经提交的原始数据(或这些数据的原产国)的提交人可能会要求专利、版权或其他知识产权的全部或部分数据；SaVaDB不保证能够向您及时通知这一变更。
谱系信息来自cov-lineages.org，采用CC BY-NC 4.0协议，版权归cov-lineages.org所有，不可商用。

对于从本系统获得的所有数据，SaVaDB不担保准确性与完整性或承担任何法律责任。
除用户信息和一些我们认为不适宜公开的数据以外，SaVaDB中的其他所有数据免费向公共领域开放。最终解释权归SaVaDB运营方所有。
`
}
                    </Card>
                </Col>
            </Row>
        );
    }
}