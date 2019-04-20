import React, { Component } from 'react';
import { Container, Card, ButtonToolbar, ToggleButton, ToggleButtonGroup, Table } from 'react-bootstrap';

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class ContractView extends Component {
  state = {
    loaded: false,
    law72Format: false,
    _id: "",
    company_name_arabic: "",
    investor_name: "غير محدد",
    investor_gender: "غير محدد",
    nationality: "غير محدد",
    investor_id_type: "غير محدد",
    investor_id_number: "غير محدد",
    investor_birth_date: "غير محدد",
    investor_address: "غير محدد",
    hq_address: "غير محدد",
    hq_city: "غير محدد",
    hq_governorate: "غير محدد",
    capital_currency: "",
    capital: "",
    board_members: [],
    companyAcceptanceDate: ""
  }
  
  componentDidMount() {
    axios.get("http://localhost:3001/api/electronicJournals/" + this.props.match.params.ej_id)
      .then(ej => {
        this.setState(ej.data);
        axios.get("http://localhost:3001/api/company/" + ej.data.companyId)
          .then(company => {
            this.setState(company.data);
            this.setState({ loaded: true });
          });
      });
  }
  
  getNouns() {
    var male = true;
    if (this.state.board_members.filter(board_member => {
      return board_member.gender === "Female";
    }).length === this.state.board_members.length) {
      male = false;
    }
    
    if (this.state.board_members.length > 1) {
      return male ? ["المديرون", "وظائفهم"] : ["المديرات", "وظائفهم"];
    } else {
      return male ? ["المدير", "وظائفه"] : ["المديرة", "وظائفها"];
    }
  }
  
  render() {
    if (!this.state.loaded) {
      return null;
    }
    
    const nouns = this.getNouns();
    var i = 1;
    
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Card>
          <Card.Body>
          <Card.Title>Contract text for {this.state._id}</Card.Title>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} onClick={() => this.setState({ law72Format: false }) }>
                Law 159 format
              </ToggleButton>
              <ToggleButton value={2} onClick={() => this.setState({ law72Format: true }) }>
                Law 72 format
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          
          <div dir="rtl" style={{ textAlign: "right" }}>
            
            <br />
            
            <p style={{ textAlign: "center", fontWeight: "bold" }}>النظام الأساسي</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>لشركة {this.state.company_name_arabic}</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>شركة شخص واحد</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>خاضعة لأحكام قانون شركات المساھمة وشركات التوصیة بالأسھم والشركات ذات المسئولیة المحدودة وشركات<br />الشخص الواحد الصادر بالقانون رقم {this.state.law72Format ? 72 : 159} لسنة {this.state.law72Format ? 2017 : 1981}</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>رقم العقد ---</p>
            
            <p>إنه في یوم {this.state.companyAcceptanceDate.substring(0, 10)} تم إقرار ھذا النظام الأساسي وفقا للمواد الآتیة :</p>
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>تمهيد</p>
            {!this.state.law72Format && <p>في إطار أحكام القانون المصري وافق الموقع على هذا النظام الأساسي على تأسيس شركة شخص واحد تحت اسم {this.state.company_name_arabic}، وتأسيساً على ذلك تقدم بهذا النظام الأساسي إلى الهيئة العامة للاستثمار والمناطق الحرة ، حيث قامت بإجراء المراجعة اللازمة له . ويقر الموقع على هذا النظام الأساسي بأنه قد توافرت فيه الأهلية اللازمة لتأسيس شركة شخص واحد ، وبأنه لم يسبق صدور أحكام عليه بعقوبة جناية أو جنحة مخلة بالشرف أو الأمانة أو بعقوبة من العقوبات المُشار إليها في المواد (89)، (162)، (163)، (164) من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة وشركات الشخص الواحد الصادر بالقانون رقم 159 لسنة 1981 ، ويشار إليه فيما بعد باسم "قانون الشركات" ، ما لم يكن قد رُد إليه اعتباره ، وأنه غير محظور عليه تأسيس شركات طبقاً لأحكام القانون .<br />وقد أقر المؤسس بالالتزام بأحكام هذا النظام الأساسي وأحكام القانون المصري، وبصفة خاصة قانون الشركات المشار إليه ولائحته التنفيذية .</p>}
            {this.state.law72Format && <p>في إطار أحكام القانون المصري وافق الموقع على هذا النظام الأساسي على تأسيس شركة شخص واحد تحت اسم {this.state.company_name_arabic}، وتأسيساً على ذلك تقدم بهذا النظام الأساسي إلى الهيئة العامة للاستثمار والمناطق الحرة ، حيث قامت بإجراء المراجعة اللازمة له . ويقر الموقع على هذا النظام الأساسي بأنه قد توافرت فيه الأهلية اللازمة لتأسيس شركة شخص واحد ، وبأنه لم يسبق صدور أحكام عليه بعقوبة جناية أو جنحة مخلة بالشرف أو الأمانة أو بعقوبة من العقوبات المُشار إليها في المواد (89)، (162)، (163)، (164) من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة وشركات الشخص الواحد الصادر بالقانون رقم 159 لسنة 1981 ، ويشار إليه فيما بعد باسم "قانون الشركات" ، ما لم يكن قد رُد إليه اعتباره ، وأنه غير محظور عليه تأسيس شركات طبقاً لأحكام القانون .<br />كما يقر أنه لم يقدم أو يساهم أو يستخدم في إنشاء أو تأسيس أو إقامة مشروع الاستثمار المتمتع بالحافز أياً من الأصول المادية لشركة أو منشأة قائمة وقت العمل بأحكام هذا القانون أو قام بتصفية تلك الشركة أو المنشأة خلال المدة المبينة بالبند (2) من المادة (12) من اللائحة التنفيذية لقانون الاستثمار بغرض إنشاء مشروع استثماري جديد يتمتع بالحوافز الخاصة المشار إليها ، ويترتب على مخالفة ذلك سقوط التمتع بالحافز المشار إليه والتزام الشركة بسداد جميع المستحقات الضريبية .<br />وقد وافق على تأسيس شركة شخص واحد مصرية الجنسية وفقاً لأحكام القوانين النافذة وعلى وجه الخصوص قانون الشركات ولائحته التنفيذية وقانون الاستثمار الصادر بالقانون رقم 72 لسنة 2017 ، ويشار إليه فيما بعد باسم "قانون الاستثمار" ولائحته التنفيذية وأحكام هذا النظام الأساسي.</p>}
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (1)</p>
            <p>اسم الشركة: {this.state.company_name_arabic} شركة شخص واحد ذات مسئولية محدودة</p>
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (2)</p>
            <p>بيانات مؤسس الشركة:</p>
            <Table bordered>
              <thead>
                <tr>
                  <td>م</td>
                  <td>الأسم</td>
                  <td>الجنسية</td>
                  <td>تاريخ الميلاد</td>
                  <td>اثبات الشخصية</td>
                  <td>الإقامة</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{this.state.investor_name}</td>
                  <td>{this.state.nationality}</td>
                  <td>{this.state.investor_birth_date.substring(0, 10)}</td>
                  <td>{this.state.investor_id_type} - {this.state.investor_id_number}</td>
                  <td>{this.state.investor_address}</td>
                </tr>
              </tbody>
            </Table>
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (3)</p>
            <p>يكون المركز الرئيسى لإدارة الشركة ومحلها القانوني في العنوان الآتى :   {this.state.hq_address} ، {this.state.hq_governorate} ، {this.state.hq_city}<br />مع مراعاة القانون رقم 14 لسنة 2012 بشأن التنمية المتكاملة في شبه جزيرة سيناء ، لمدير الشركة إنشاء فروع أو وكالات لها داخل جمهورية مصر العربية أو خارجها ، وللشركة أن تقرر نقل المركز الرئيسي لها إلى أي مدينة أخرى داخل جمهورية مصر العربية بموافقة مؤسس أو مالك الشركة .</p>
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (4)</p>
            <p>حدد رأسمال الشركة بمبلغ {this.state.capital} {this.state.capital_currency}، وقد أودع رأسمال الشركة بالكامل في البنك بموجب الشهادة المرفقة.</p>
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (5)</p>
            <p>يجوز زيادة رأس مال الشركة على دفعة واحدة أو أكثر ، سواء بإصدار حصص جديدة أو بتحويل المال الاحتياطي إلى حصص ، وذلك بقرار من مؤسس أو مالك الشركة وطبقا للأحكام المنصوص عليها في قانون الشركات.</p>
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (6)</p>
            <p>لمؤسس أو مالك الشركة أن يقرر تخفيض رأس مال الشركة لأي سبب ، سواء عن طريق إنقاص عدد الحصص أو تخفيض القيمة الاسمية لكل منها ، وفقاً لأحكام قانون الشركات ولائحته التنفيذية .<br />ولا يجوز تخفيض رأس المال إلى أقل من {this.state.capital_currency === "EGP" && "ما يعادل"} خمسين ألف جنيه .</p>
            
            {this.state.board_members.length > 0 && <>
              <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (7)</p>
              <p>يتولى إدارة الشركة مؤسس الشركة أو مدير أو أكثر يعينهم مؤسس الشركة على النحو التالي:</p>
              <Table bordered>
                <thead>
                  <tr>
                    <td>م</td>
                    <td>الأسم</td>
                    <td>الجنسية</td>
                    <td>تاريخ الميلاد</td>
                    <td>اثبات الشخصية</td>
                    <td>الإقامة</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.board_members.map(board_member => <>
                    <tr>
                      <td>{i++}</td>
                      <td>{board_member.name}</td>
                      <td>{board_member.nationality}</td>
                      <td>{board_member.birth_date.substring(0, 10)}</td>
                      <td>{board_member.id_type} - {board_member.id_number}</td>
                      <td>{board_member.address}</td>
                    </tr>
                  </>)}
                </tbody>
              </Table>
              <p>و يباشر {nouns[0]} {nouns[1]} لمدة غير محددة .<br />ويسرى في شأن مدير الشركة حكم المادة (89) من قانون الشركات ، مع مراعاة ألا يكون غير محظور عليه إدارة الشركات طبقاً لأحكام القانون .<br />ولا يجوز للمدير أن يتولى إدارة شركة أخرى أياً كان نوعها إذا كانت تعمل في ذات النشاط الذي تزاوله الشركة أو أحد فروعها ، كما لا يجوز له أن يتعاقد مع الشركة التي يتولى إدارتها لحسابه أو لحساب غيره ، أو يمارس لحساب الغير نشاطاً من نوع النشاط الذى تزاوله الشركة .</p>
            </>}
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (8)</p>
            {!this.state.law72Format && <p>تسري على الشركة أحكام قانون الشركات ولائحته التنفيذية فيما لم يرد بشأنه نص خاص في هذا النظام .</p>}
            {this.state.law72Format && <p>تسري على الشركة أحكام قانون الشركات وقانون الاستثمار ولائحتيهما التنفيذية فيما لم يرد بشأنه نص خاص في هذا النظام .</p>}
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (9)</p>
            <p>ينشر هذا النظام طبقا لأحكام القانون .</p>
            
            <p style={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>المادة (10)</p>
            <p>قام مؤسس الشركة بشخصه باتخاذ كافة الإجراءات اللازمة في هذا الشأن .<br />وتلتزم الشركة بأداء المصروفات والنفقات والأجور والتكاليف التي تم انفاقها بسبب تأسيس الشركة ، وذلك خصماً من حساب المصروفات العامة.</p>
            
          </div>
          
          <Card.Link href="/electronicJournal">Back to all contracts</Card.Link>
            
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default ContractView;
