import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export const CardLanding=({titulo,imagen})=> {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <h4 className="font-bold text-large">{titulo}</h4>
     
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={imagen}
          width={270}
        />
      </CardBody>
    </Card>
  );
}

export default CardLanding;